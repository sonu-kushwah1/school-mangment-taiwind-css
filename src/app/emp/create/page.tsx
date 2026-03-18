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
  const router = useRouter();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "male",
    phone: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/emp_list", formData);

      toast.success("Employee Created Successfully");

      setFormData({
        fname: "",
        lname: "",
        gender: "male",
        phone: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        address: "",
      });

      setTimeout(() => {
        router.push("/emp");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create employee");
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Employee
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
                { label: "Other", value: "other" },
              ]}
            />

            <InputField
              label="Phone"
              name="phone"
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

            <SelectField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              options={[
                { label: "Select Department", value: "" },
                { label: "HR", value: "HR" },
                { label: "IT", value: "IT" },
                { label: "Finance", value: "Finance" },
                { label: "Marketing", value: "Marketing" },
              ]}
            />

            <SelectField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              options={[
                { label: "Select Designation", value: "" },
                { label: "Manager", value: "Manager" },
                { label: "Developer", value: "Developer" },
                { label: "Analyst", value: "Analyst" },
                { label: "Designer", value: "Designer" },
              ]}
            />

            <InputField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>

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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="colored"
      />
    </LayoutWrapper>
  );
}