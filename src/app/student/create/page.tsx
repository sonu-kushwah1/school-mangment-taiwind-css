"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import LayoutWrapper from "@/component/Layout";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import Button from "@/component/Button";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FeeItem {
  className: string;
  fees: number;
}

export default function CreateEmployee() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [feesList, setFeesList] = useState<FeeItem[]>([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    mob_no: "",
    dob: "",
    blood_group: "A+",
    religion: "Hindu",
    email: "",
    class_name: "",
    section: "A",
    fees: ""
  });

  // ================= FETCH FEES =================
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/fees"
        );

        console.log("FEES RESPONSE:", res.data);

        const feesData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setFeesList(feesData);

        // Default class and fees
        if (feesData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            class_name: feesData[0].className,
            fees: String(feesData[0].fees)
          }));
        }
      } catch (error) {
        console.error("Error fetching fees:", error);

        toast.error("Failed to load fees data");

        setFeesList([]);
      }
    };

    fetchFees();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Auto update fees when class changes
    if (name === "class_name") {
      const selectedClass = feesList.find(
        (item) => item.className === value
      );

      setFormData((prev) => ({
        ...prev,
        class_name: value,
        fees: selectedClass
          ? String(selectedClass.fees)
          : ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,
        fees: formData.fees
          ? Number(formData.fees)
          : 0,
        dob: formData.dob || null
      };

      console.log("PAYLOAD:", payload);

      const response = await axios.post(
        "http://localhost:5001/api/student",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("SUCCESS RESPONSE:", response.data);

      toast.success(
        response.data?.message ||
          "Student Created Successfully"
      );

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        gender: "male",
        mob_no: "",
        dob: "",
        blood_group: "A+",
        religion: "Hindu",
        email: "",
        class_name:
          feesList.length > 0
            ? feesList[0].className
            : "",
        section: "A",
        fees:
          feesList.length > 0
            ? String(feesList[0].fees)
            : ""
      });

      // Redirect
      setTimeout(() => {
        router.push("/student");
      }, 1500);

    } catch (error: any) {

      console.error("SUBMIT ERROR:", error);

      // Axios error handling
      if (error.response) {

        console.log(
          "ERROR RESPONSE:",
          error.response.data
        );

        toast.error(
          error.response.data?.message ||
            "Server Error"
        );

      } else if (error.request) {

        toast.error(
          "No response from server"
        );

      } else {

        toast.error(
          "Something went wrong"
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">

        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">

          <h1 className="text-2xl font-bold mb-6 text-center">
            Admission Form
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* FIRST NAME */}
            <InputField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />

            {/* LAST NAME */}
            <InputField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />

            {/* GENDER */}
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                {
                  label: "Male",
                  value: "male"
                },
                {
                  label: "Female",
                  value: "female"
                },
                {
                  label: "Other",
                  value: "other"
                }
              ]}
            />

            {/* DOB */}
            <InputField
              label="DOB"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            {/* PHONE */}
            <InputField
              label="Phone"
              name="mob_no"
              type="text"
              value={formData.mob_no}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* CLASS */}
            <SelectField
              label="Class"
              name="class_name"
              value={formData.class_name}
              onChange={handleChange}
              options={feesList.map((item) => ({
                label: item.className,
                value: item.className
              }))}
            />

            {/* FEES */}
            <InputField
              label="Fees"
              name="fees"
              type="text"
              value={formData.fees}
              disabled
            />

            {/* SECTION */}
            <SelectField
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              options={[
                {
                  label: "Section A",
                  value: "A"
                },
                {
                  label: "Section B",
                  value: "B"
                },
                {
                  label: "Section C",
                  value: "C"
                }
              ]}
            />

            {/* BUTTON */}
            <div className="md:col-span-2 mt-4">
              <Button
                label={
                  loading
                    ? "Saving..."
                    : "Save Student"
                }
                type="submit"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="colored"
      />
    </LayoutWrapper>
  );
}