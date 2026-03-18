"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";

export default function EditStudent() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [feesList, setFeesList] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "male",
    phone: "",
    dob: "",
    bloodGroup: "A+",
    religion: "Hindu",
    email: "",
    className: "",
    section: "A",
    fees: ""
  });

  // Fetch fees list
  useEffect(() => {

    const fetchFees = async () => {
      try {
        const res = await axios.get("http://localhost:3001/fees_list");
        setFeesList(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFees();

  }, []);

  // Fetch student data
  useEffect(() => {

    const fetchStudent = async () => {
      try {

        const res = await axios.get(
          `http://localhost:3001/student_list/${id}`
        );

        setFormData(res.data);

      } catch (error) {
        console.error(error);
        toast.error("Failed to load student");
      }
    };

    if (id) fetchStudent();

  }, [id]);

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    if (name === "className") {

      const selectedClass = feesList.find(
        (item) => item.className === value
      );

      setFormData((prev) => ({
        ...prev,
        className: value,
        fees: selectedClass ? selectedClass.fees : ""
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));

    }

  };

  // Update student
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:3001/student_list/${id}`,
        formData
      );

      toast.success("Student Updated Successfully");

      setTimeout(() => {
        router.push("/student");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Failed to update student");
    }

  };

  return (
    <LayoutWrapper>

      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">

        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">

          <h1 className="text-2xl font-bold mb-6 text-center">
            Edit Student
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <InputField
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />

            <InputField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" }
              ]}
            />

            <InputField
              label="Dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <InputField
              label="Phone"
              name="phone"
              type="number"
              value={formData.phone}
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

            {/* Class dropdown */}
            <SelectField
              label="Class"
              name="className"
              value={formData.className}
              onChange={handleChange}
              options={feesList.map((item) => ({
                label: item.className,
                value: item.className
              }))}
            />

            {/* Fees auto fill */}
            <InputField
              label="Fees"
              name="fees"
              type="number"
              value={formData.fees}
              disabled
            />

            <SelectField
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              options={[
                { label: "Section A", value: "A" },
                { label: "Section B", value: "B" },
                { label: "Section C", value: "C" }
              ]}
            />

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Update Student
              </button>
            </div>

          </form>

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