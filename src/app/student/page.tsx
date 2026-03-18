"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Student } from "@/types/students";
import { LayoutRouter } from "next/dist/server/app-render/entry-base";
import LayoutWrapper from "@/component/Layout";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast, ToastContainer } from "react-toastify";

import CustomPagination from "@/component/customPagination";
import Breadcrumb from "@/component/Breadcrumb";

export default function EmployeeList() {
  const [students, setStudents] = useState<Student[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  const fetchEmployees = async (page = 1) => {
    const res = await axios.get<Student[]>(
      "http://localhost:3001/student_list",
    );
    setStudents(res.data);
    setTotalPages(Math.ceil(res.data.length / pageSize));
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  // Get paginated students
  const paginatedStudents = students.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
        <div className="flex justify-between mb-4">
           
          <h1 className="text-2xl font-bold">Student List</h1>

          <button
            onClick={() => router.push("/student/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Emp
          </button>
        </div>

        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Mobile No</th>
              <th className="border p-2">Total Fees</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((std, index) => (
              <tr key={std.id}>
                <td className="border p-2">{index + 1}</td>
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
          </tbody>
        </table>
        {/* Pagination Component */}
        <div className="mt-4 flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
