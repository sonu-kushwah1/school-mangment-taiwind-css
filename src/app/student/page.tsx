"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Student } from "@/types/students";
import LayoutWrapper from "@/component/Layout";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import CustomPagination from "@/component/customPagination";
import Breadcrumb from "@/component/Breadcrumb";
import Button from "@/component/buttonCom";
import PageHeader from "@/utils/PageHeader";
import InputField from "@/component/InputFiled";


export default function EmployeeList() {
  const [students, setStudents] = useState<Student[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 Filter state
  const [search, setSearch] = useState("");
  const [field, setField] = useState("fname");

  const pageSize = 5;
  const router = useRouter();

  // Fetch Data
  const fetchEmployees = async () => {
    const res = await axios.get<Student[]>(
      "http://localhost:3001/student_list"
    );
    setStudents(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔥 Filter Fields
  const fields = [
    { label: "First Name", value: "fname" },
    { label: "Last Name", value: "lname" },
    { label: "Gender", value: "gender" },
    { label: "Mobile", value: "phone" },
  ];

  // 🔥 Filter Logic
const filteredStudents = students.filter((item) =>
  (item as any)[field]?.toString().toLowerCase().includes(search.toLowerCase())
);

  // 🔥 Update Total Pages
  useEffect(() => {
    setTotalPages(Math.ceil(filteredStudents.length / pageSize));
  }, [filteredStudents]);

  // 🔥 Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, field]);

  // 🔥 Pagination
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Delete
  const handleDelete = async (student_id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    await axios.delete(`http://localhost:3001/student_list/${student_id}`);
    toast.success("Student Deleted Successfully");
    fetchEmployees();
  };

  return (
    <LayoutWrapper>
      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">

        {/* Header */}
        <PageHeader title="Student List" buttonText="Add New Student" buttonLink="/student/create"/>
        {/* 🔥 Filter UI */}
        <div className="flex gap-3 mb-4">
        
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {fields.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <InputField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."

          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="bg-red-500 text-white px-3 rounded"
            >
              ✕
            </button>
          )}
        </div>

        {/* Table */}
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">First Name</th>
              <th className="border p-2 text-left">Last Name</th>
              <th className="border p-2 text-left">Gender</th>
              <th className="border p-2 text-left">Mobile No</th>
              <th className="border p-2 text-left">Total Fees</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((std, index) => (
              <tr key={std.id}>
                <td className="border p-2">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="border p-2">{std.fname}</td>
                <td className="border p-2">{std.lname}</td>
                <td className="border p-2">{std.gender}</td>
                <td className="border p-2">{std.phone}</td>
                <td className="border p-2">{std.fees}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => router.push(`/student/edit/${std.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => router.push(`/student/view/${std.id}`)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(std.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedStudents.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Toast */}
      <ToastContainer transition={Slide} theme="colored" />
    </LayoutWrapper>
  );
}