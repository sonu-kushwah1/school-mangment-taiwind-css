"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Student {
  id: number;
  first_name: string;
  class_name: string;
  fees: number;
}

export default function FeesSubmitPage() {

  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  // ✅ SQL Table Field Names
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    student_class: "",
    total_fees: "",
    paid_fees: "",
    due_fees: "",
    payment_method: "Cash",
    date: ""
  });

  // 🔥 Fetch Students
  useEffect(() => {

    fetch("http://localhost:5001/api/student")
      .then((res) => res.json())
      .then((data) => {

        console.log("student-api", data);

        setStudents(data);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  // 📝 Handle Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    // 🏫 Class Change
    if (name === "student_class") {

      const filtered = students.filter(
        (student) => student.class_name === value
      );

      setFilteredStudents(filtered);

      setFormData((prev) => ({
        ...prev,
        student_class: value,
        student_id: "",
        student_name: "",
        total_fees: "",
        paid_fees: "",
        due_fees: ""
      }));

      return;
    }

    // 👤 Student Change
    if (name === "student_id") {

      const selectedStudent = students.find(
        (student) => student.id.toString() === value
      );

      if (selectedStudent) {

        const totalFees = Number(selectedStudent.fees);
        const paidFees = 0;
        const dueFees = totalFees - paidFees;

        setFormData((prev) => ({
          ...prev,
          student_id: value,
          student_name: selectedStudent.first_name,
          total_fees: totalFees.toString(),
          paid_fees: paidFees.toString(),
          due_fees: dueFees.toString()
        }));

      }

      return;
    }

    // 💰 Paid Fees Change
    if (name === "paid_fees") {

      const total = Number(formData.total_fees);
      const paid = Number(value);

      const due = total - paid;

      setFormData((prev) => ({
        ...prev,
        paid_fees: value,
        due_fees: due.toString()
      }));

      return;
    }

    // ✍️ Normal Change
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // 📤 Submit
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      console.log("submit-data", formData);

      const response = await fetch(
        "http://localhost:5001/api/studentfees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      console.log("fees-submit", data);

      if (response.ok) {

        toast.success("Fees Submitted Successfully");

        // 🔄 Reset Form
        setFormData({
          student_id: "",
          student_name: "",
          student_class: "",
          total_fees: "",
          paid_fees: "",
          due_fees: "",
          payment_method: "Cash",
          date: ""
        });

        setFilteredStudents([]);

      } else {

        toast.error(data.message || "Failed to Submit Fees");

      }

    } catch (error) {

      console.log(error);

      toast.error("Server Error");

    }

  };

  // 🎯 Unique Classes
  const uniqueClasses = [
    ...new Set(students.map((student) => student.class_name))
  ];

  return (
    <LayoutWrapper>

      <div className="min-h-screen bg-gray-50 flex justify-center p-6">

        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">

          <h1 className="text-2xl font-bold text-center mb-6">
            Fees Submission Form
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            {/* 🏫 Class */}
            <SelectField
              label="Select Class"
              name="student_class"
              value={formData.student_class}
              onChange={handleChange}
              options={uniqueClasses.map((cls) => ({
                label: cls,
                value: cls
              }))}
            />

            {/* 👤 Student */}
            <SelectField
              label="Select Student"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              options={filteredStudents.map((student) => ({
                label: student.first_name,
                value: student.id.toString()
              }))}
            />

            {/* 💰 Total Fees */}
            <InputField
              label="Total Fees"
              name="total_fees"
              type="number"
              value={formData.total_fees}
              onChange={handleChange}
              disabled
            />

            {/* 💵 Paid Fees */}
            <InputField
              label="Paid Fees"
              name="paid_fees"
              type="number"
              value={formData.paid_fees}
              onChange={handleChange}
            />

            {/* ⚠️ Due Fees */}
            <InputField
              label="Due Fees"
              name="due_fees"
              type="number"
              value={formData.due_fees}
              onChange={handleChange}
              disabled
            />

            {/* 📅 Date */}
            <InputField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />

            {/* 💳 Payment Method */}
            <SelectField
              label="Payment Method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              options={[
                { label: "Cash", value: "Cash" },
                { label: "UPI", value: "UPI" },
                { label: "By Check", value: "By Check" }
              ]}
            />

            {/* 🔘 Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Submit Fees
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