"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Employee } from "@/types/employee";
import LayoutWrapper from "@/component/Layout";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  const fetchEmployees = async () => {
    const res = await axios.get<Employee[]>("http://localhost:3001/emp_list");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

const handleDelete = async (emp_id: string) => {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  try {
    await axios.delete(`http://localhost:3001/emp_list/${emp_id}`);

    toast.success("Employee Deleted Successfully");

    fetchEmployees(); // refresh list
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete employee");
  }
};

  return (
    <LayoutWrapper>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Employees Curd in Simple</h1>

          <button
            onClick={() => router.push("/emp/create")}
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
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp,index) => (
              <tr key={emp.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  {emp.fname}
                </td>
                <td className="border p-2">
                  {emp.lname}
                </td>
                <td className="border p-2">{emp.gender}</td>
                <td className="border p-2">{emp.phone}</td>
                <td className="border p-2 space-x-2">
                  <button
                   onClick={() => router.push(`/emp/edit/${emp.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => router.push(`/emp/view/${emp.id}`)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
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
