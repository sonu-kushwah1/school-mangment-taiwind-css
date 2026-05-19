"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import CommonDataTable from "@/component/DataTable";
import { api } from "@/api";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email:string;
  gender: string;
  mob_no: string;
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  const API = "http://localhost:5001/api/student";

  // ✅ Fetch
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      console.log(res.data);
      setStudents(res.data);
    } catch {
      toast.error("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Deleted successfully");
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ Columns (IMPORTANT: library format)
  const columns = [
    {
      name: "ID",
      cell: (_: Student, index: number) => index + 1,
      width: "80px",
    },
    {
      name: "First Name",
      selector: (row: Student) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: Student) => row.last_name,
      sortable: true,
    },
    {
      name: "email",
      selector: (row: Student) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row: Student) => row.mob_no,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (student: Student) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <button
            onClick={() => router.push(`/student/edit/${student.id}`)}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => router.push(`/student/view/${student.id}`)}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            View
          </button>

          <button
            onClick={() => handleDelete(student.id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <LayoutWrapper>
      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Student List</h1>

          <button
            onClick={() => router.push("/student/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Student
          </button>
        </div>

        {/* ✅ Correct Table */}
        <CommonDataTable
          title="Student List"
          data={students}
          columns={columns}
        />
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
