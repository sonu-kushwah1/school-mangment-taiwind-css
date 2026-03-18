"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";

export default function CreateExpense() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    idNo: "",
    expenseType: "",
    amount: "",
    phone: "",
    status: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log("Field changed:", name, "=", value); // DEBUG LOG
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // DEBUG: Log form data before submit
    console.log("Submitting form data:", formData);
    
    // Validate required fields
    if (!formData.name || !formData.idNo || !formData.expenseType || !formData.amount) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/expenses_list", formData);
      console.log("API Response:", response.data); // DEBUG LOG
      
      toast.success("Expense Created Successfully");

      setFormData({
        name: "",
        idNo: "",
        expenseType: "",
        amount: "",
        phone: "",
        status: "",
        date: "",
      });

      setTimeout(() => {
        router.push("/expenses");
      }, 1500);
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error("Failed to create expense: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Expense
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <InputField
                label="Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* ID No */}
            <div>
              <InputField
                label="ID No *"
                name="idNo"
                value={formData.idNo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Expense Type - FIXED */}
            <div>
              <SelectField
                label="Expense Type *"
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                options={[
                  { label: "Please Select", value: "" },
                  { label: "Salary", value: "Salary" },
                  { label: "Transport", value: "Transport" },
                  { label: "Maintanance", value: "Maintanance" }, // Fixed spelling
                  { label: "Purchase", value: "Purchase" },
                  { label: "Utilities", value: "Utilities" },
                ]}
              />
            </div>

            {/* Amount */}
            <div>
              <InputField
                label="Amount *"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <InputField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div>
              <SelectField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { label: "Please Select", value: "" },
                  { label: "Paid", value: "Paid" },
                  { label: "Due", value: "Due" },
                  { label: "Others", value: "Others" },
                ]}
              />
            </div>

            {/* Date */}
            <div className="md:col-span-2">
              <InputField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
              >
                Create Expense
              </button>
            </div>
          </form>
        </div>
      </div>

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
