"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";

export default function CreateEmployee() {
   // Router instance for navigation
  const router = useRouter();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "male",
    phone: "",
    dob: "",
    bloodGroup: "A+",
    religion: "Hindu",
    email: "",
    class: "1",
    section: "A",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/student_list", formData);

      toast.success("Student Created Successfully");

      setFormData({
       fname: "",
        lname: "",
        gender: "male",
        phone: "",
        dob: "",
        bloodGroup: "A+",
        religion: "Hindu",
        email: "",
        class: "1",
        section: "A",
      });

      setTimeout(() => {
        router.push("/student");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create student");
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
            {/* First Name */}
            <div>
              <InputField
                label="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <InputField
                label="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div>
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />
            </div>
            {/* Dob */}
            <div>
              <InputField
                label="Dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            {/* Blood Group */}
            <div>
              <SelectField
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                options={[
                  { label: "A+", value: "A+" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B-", value: "B-" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                ]}
              />
            </div>

            {/* Religion */}
            <div>
              <SelectField
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                options={[
                  { label: "Hindu", value: "Hindu" },
                  { label: "Muslim", value: "Muslim" },
                  { label: "Christian", value: "Christian" },
                  { label: "Sikh", value: "Sikh" },
                  { label: "Buddhist", value: "Buddhist" },
                  { label: "Jain", value: "Jain" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </div>

            {/* Phone */}
            <div>
              <InputField
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* E-Mail */}
            <div>
              <InputField
                label="E-Mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Class */}
            <div>
              <SelectField
                label="Class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                options={[
                  { label: "Class 1", value: "1" },
                  { label: "Class 2", value: "2" },
                  { label: "Class 3", value: "3" },
                  { label: "Class 4", value: "4" },
                  { label: "Class 5", value: "5" },
                  { label: "Class 6", value: "6" },
                  { label: "Class 7", value: "7" },
                  { label: "Class 8", value: "8" },
                  { label: "Class 9", value: "9" },
                  { label: "Class 10", value: "10" },
                  { label: "Class 11", value: "11" },
                  { label: "Class 12", value: "12" },
                ]}
              />
            </div>
            {/* Section */}
            <div>
              <SelectField
                label="Section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                options={[
                  { label: "Section A", value: "A" },
                  { label: "Section B", value: "B" },
                  { label: "Section C", value: "C" },
                ]}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Save Employee
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />
    </LayoutWrapper>
  );
}
