"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";

export default function FeesSubmitPage() {
  const router = useRouter();

  const [studentList, setStudentList] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    className: "",
    studentId: "",
    studentName: "",
    totalFees: "",
    paidFees: "",
    dueFees: "",
    installmentMonth: "",
    payAmount: "",
    remainingFees: ""
  });

  // 📥 Fetch Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/student_list");
        setStudentList(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  // 🏫 Unique Classes
  const classList = [...new Set(studentList.map((s) => s.className))];

  // 👤 Filter Students
  const filteredStudents = studentList.filter(
    (s) => s.className === formData.className
  );

  // 🔁 Handle Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev: any) => {
      let updated = { ...prev, [name]: value };

      // 🏫 Reset on class change
      if (name === "className") {
        updated = {
          ...updated,
          studentId: "",
          studentName: "",
          totalFees: "",
          paidFees: "",
          dueFees: "",
          payAmount: "",
          remainingFees: ""
        };
      }

      // 👤 Student selected
      if (name === "studentId") {
        const student = studentList.find(
          (s) => String(s.id) === String(value)
        );

        if (student) {
          const total = Number(student.fees) || 0;
          const paid = Number(student.paidFees) || 0;
          const due = Math.max(total - paid, 0);

          updated.studentName = `${student.fname} ${student.lname}`;
          updated.className = student.className;
          updated.totalFees = String(total);
          updated.paidFees = String(paid);
          updated.dueFees = String(due);
          updated.payAmount = "";
          // Same as due until user enters pay amount (remaining updates on payAmount change)
          updated.remainingFees = String(due);
        }
      }

      // 💰 Payment calculation
      if (name === "payAmount") {
        const due = Number(updated.dueFees) || 0;
        const pay = Number(value) || 0;

        updated.remainingFees = String(Math.max(due - pay, 0));
      }

      return updated;
    });
  };

  // 📤 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    const pay = Number(formData.payAmount);
    const due = Number(formData.dueFees) || 0;

    if (!formData.studentId || !formData.payAmount) {
      toast.error("Please fill all required fields");
      return;
    }

    if (pay <= 0 || pay > due) {
      toast.error("Pay amount must be greater than 0 and not more than due fees");
      return;
    }

    try {
      const prevPaid = Number(formData.paidFees) || 0;
      const newPaid = prevPaid + pay;

      await axios.patch(
        `http://localhost:3001/student_list/${formData.studentId}`,
        { paidFees: String(newPaid) }
      );

      const payload = {
        ...formData,
        totalFees: Number(formData.totalFees),
        paidFees: newPaid,
        dueFees: Number(formData.dueFees),
        payAmount: pay,
        remainingFees: Math.max(due - pay, 0)
      };

      await axios.post("http://localhost:3001/fees_submit", payload);

      toast.success("Fees Submitted Successfully");

      setTimeout(() => {
        router.push("/fees");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Failed to submit fees");
    }
  };

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
              name="className"
              value={formData.className || ""}
              onChange={handleChange}
              options={classList.map((cls) => ({
                label: cls,
                value: cls
              }))}
            />

            {/* 👤 Student */}
            <SelectField
              label="Select Student"
              name="studentId"
              value={formData.studentId || ""}
              onChange={handleChange}
              disabled={!formData.className}
              options={
                filteredStudents.length
                  ? filteredStudents.map((s) => ({
                      label: `${s.fname} ${s.lname}`,
                      value: s.id
                    }))
                  : [{ label: "No students found", value: "" }]
              }
            />

            {/* 💰 Total Fees */}
            <InputField
              label="Total Fees"
              name="totalFees"
              type="number"
              value={formData.totalFees || ""}
              disabled
            />

            {/* 💸 Paid Fees */}
            <InputField
              label="Paid Fees"
              name="paidFees"
              type="number"
              value={formData.paidFees || ""}
              disabled
            />

            {/* ⚠️ Due Fees */}
            <InputField
              label="Due Fees"
              name="dueFees"
              type="number"
              value={formData.dueFees || ""}
              disabled
            />

            {/* 📅 Installment Month */}
            <SelectField
              label="Installment Month"
              name="installmentMonth"
              value={formData.installmentMonth || ""}
              onChange={handleChange}
              options={[
                { label: "January", value: "Jan" },
                { label: "February", value: "Feb" },
                { label: "March", value: "Mar" },
                { label: "April", value: "Apr" },
                { label: "May", value: "May" },
                { label: "June", value: "Jun" },
                { label: "July", value: "Jul" },
                { label: "August", value: "Aug" },
                { label: "September", value: "Sep" },
                { label: "October", value: "Oct" },
                { label: "November", value: "Nov" },
                { label: "December", value: "Dec" }
              ]}
            />

            {/* 💵 Pay */}
            <InputField
              label="Pay Amount"
              name="payAmount"
              type="number"
              value={formData.payAmount || ""}
              onChange={handleChange}
            />

            {/* 📉 Remaining */}
            <InputField
              label="Remaining Fees"
              name="remainingFees"
              type="number"
              value={formData.remainingFees || ""}
              disabled
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