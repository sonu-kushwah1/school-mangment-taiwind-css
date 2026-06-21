"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import CommonDataTable from "@/component/DataTable";
import { getAuthToken } from "@/utils/auth";

import { Slide, toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

type Student = {
  id: string;
  fname: string;
  email: string;
  phone: string;
  role: string;
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  const studentUrl =
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_API}/users`;

  // ✅ Fetch
  const fetchStudents = async () => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(studentUrl, { headers });
      console.log("user data api", res.data);
      const responseData = res.data;
      const usersArray = Array.isArray(responseData)
        ? responseData
        : (responseData && Array.isArray(responseData.data) ? responseData.data : []);

      const mappedUsers = usersArray.map((u: any) => ({
        ...u,
        id: u.id || u._id,
      }));
      setStudents(mappedUsers);
    } catch (err) {
      console.error("Fetch users error:", err);
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
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.delete(`${studentUrl}/${id}`, { headers });
      toast.success("Deleted successfully");
      fetchStudents();
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error("Delete failed");
    }
  };

  // ✅ Handle Role Change
  const handleRoleChange = async (student: Student, newRole: string) => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const userUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_API}/users/${student.id}`;

      const updateData = {
        fname: student.fname,
        email: student.email,
        phone: student.phone,
        role: newRole,
      };

      await axios.put(userUrl, updateData, { headers });
      toast.success(`Role updated to ${newRole} successfully`);
      fetchStudents();
    } catch (err: any) {
      console.error("Update Role Error:", err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Failed to update role";
      toast.error(errMsg);
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
      name: "Name",
      selector: (row: Student) => row.fname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Student) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: Student) => row.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: Student) => row.role,
      cell: (student: Student) => (
        <select
          value={student.role}
          onChange={(e) => handleRoleChange(student, e.target.value)}
          className="border rounded-md px-3 py-1.5 bg-white text-[#042954] border-[#ffa601] outline-none transition focus:ring-2 focus:ring-[#ffa601] cursor-pointer text-sm"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="student">Student</option>
        </select>
      ),
      sortable: true,
    },
  ];

  return (
    <LayoutWrapper>
      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">User Role Assignment</h1>

          <button
            onClick={() => router.push("/registration")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New User
          </button>
        </div>

        {/* ✅ Correct Table */}
        <CommonDataTable
          title="User Role Assignment List"
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
