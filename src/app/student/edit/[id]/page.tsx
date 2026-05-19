"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useRouter,
} from "next/navigation";

import LayoutWrapper from "@/component/Layout";

import {
  ToastContainer,
  toast,
  Slide,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import Button from "@/component/Button";

export default function EditStudent() {

  const router = useRouter();

  const params = useParams();

  // ✅ Fix ID issue
  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  // ✅ Fees List
  const [feesList, setFeesList] = useState<any[]>([]);

  // ✅ Loading
  const [loading, setLoading] = useState(true);

  // ✅ Form Data
  const [formData, setFormData] = useState({
     first_name: "",
    last_name: "",
    gender: "male",
    mob_no: "",
    dob: "",
    blood_group: "A+",
    religion: "Hindu",
    class_name: "",
    email: "",
    section: "A",
    fees: ""
  });

  // ✅ Fetch Fees
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

      } catch (error) {

        console.error("Fees Fetch Error:", error);

        toast.error("Failed to fetch fees");

      }
    };

    fetchFees();

  }, []);

  // ✅ Fetch Student By ID
  useEffect(() => {

    if (!id) return;

    const fetchStudent = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `http://localhost:5001/api/student/${id}`
        );

        console.log("STUDENT RESPONSE:", res.data);

        // ✅ Handle multiple API structures
        const studentData =
          res.data.data ||
          res.data.student ||
          res.data;

        setFormData({
          first_name: studentData.first_name || "",
          last_name: studentData.last_name || "",
          gender: studentData.gender || "male",
          mob_no: studentData.mob_no || "",
          dob: studentData.dob
            ? studentData.dob.split("T")[0]
            : "",
          blood_group:
            studentData.blood_group || "A+",
          religion:
            studentData.religion || "Hindu",
          email: studentData.email || "",
          class_name:
            studentData.class_name || "",
          section: studentData.section || "A",
          fees: studentData.fees || "",
        });

      } catch (error: any) {

        console.error(
          "Student Fetch Error:",
          error
        );

        toast.error("Failed to fetch student");

      } finally {

        setLoading(false);

      }
    };

    fetchStudent();

  }, [id]);

  // ✅ Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    // ✅ Auto Update Fees
    if (name === "class_name") {

      const selectedClass = feesList.find(
        (item) =>
          item.className === value
      );

      setFormData((prev) => ({
        ...prev,
        class_name: value,
        fees: selectedClass
          ? selectedClass.fees
          : "",
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
  };

  // ✅ Update Student
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!id) {

      toast.error("Student ID not found");

      return;
    }

    try {

      const res = await axios.put(
        `http://localhost:5001/api/student/${id}`,
        formData
      );

      console.log(
        "UPDATE RESPONSE:",
        res.data
      );

      toast.success(
        "Student Updated Successfully"
      );

      setTimeout(() => {

        router.push("/student");

      }, 1500);

    } catch (error: any) {

      console.error(
        "Update Error:",
        error
      );

      toast.error("Failed to update student");

    }
  };

  return (
    <LayoutWrapper>

      <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">

        <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6">

          <h1 className="text-2xl font-bold text-center mb-6">
            Edit Student
          </h1>

          {loading ? (

            <div className="text-center py-10">
              Loading student data...
            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              <InputField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

              <InputField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />

              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
              />

              <InputField
                label="DOB"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />

              <InputField
                label="Phone"
                name="mob_no"
                type="number"
                value={formData.mob_no}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* ✅ Class Dropdown */}
              <SelectField
                label="Class"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                options={
                  Array.isArray(feesList)
                    ? feesList.map((item) => ({
                        label: item.className,
                        value: item.className,
                      }))
                    : []
                }
              />

              {/* ✅ Fees */}
              <InputField
                label="Fees"
                name="fees"
                type="number"
                value={formData.fees}
                disabled
              />

              {/* ✅ Section */}
              <SelectField
                label="Section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                options={[
                  {
                    label: "Section A",
                    value: "A",
                  },
                  {
                    label: "Section B",
                    value: "B",
                  },
                  {
                    label: "Section C",
                    value: "C",
                  },
                ]}
              />

              {/* ✅ Submit Button */}
              <div className="md:col-span-2 mt-4">

                <Button
                  label="Update Student"
                  type="submit"
                  className="w-full"
                />

              </div>

            </form>

          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="colored"
      />

    </LayoutWrapper>
  );
}