"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import LayoutWrapper from "@/component/Layout";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "@/component/Breadcrumb";

export default function EmployeeList() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const fetchUsers = async () => {
    const res = await axios.get<User[]>("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const handleDelete = async (user_id: string) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await axios.delete(`http://localhost:5000/users/${user_id}`);

    toast.success("User Deleted Successfully");

    fetchUsers(); // refresh list
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete user");
  }
};

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Rols and Permission</h1>

          <button
            onClick={() => router.push("/emp/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
           Create Role
          </button>
        </div>

        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Permission</th>
        
              <th className="border p-2 text-left">Users</th>
              <th className="border p-2 text-left">Created</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user,index) => (
              <tr key={user.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  {user.role}
                </td>
                 <td className="border p-2">
                  1 Permission
                </td>
                <td className="border p-2">
                  2 User
                </td>
               
                <td className="border p-2">12/11/2025</td>
                <td className="border p-2 space-x-2">
                  <button
                   onClick={() => router.push(`/emp/edit/${user.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => router.push(`/emp/view/${user.id}`)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
