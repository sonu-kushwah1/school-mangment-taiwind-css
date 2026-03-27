"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import LayoutWrapper from "@/component/Layout";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import CustomPagination from "@/component/customPagination";
import Breadcrumb from "@/component/Breadcrumb";
import Button from "@/component/buttonCom";

// ✅ Import reusable filter
import { useFilter } from "@/hooks/useFilter";
import FilterBar from "@/component/Filter/FilterBar";

export default function EmployeeList() {
  const [students, setStudents] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 4;
  const router = useRouter();
  
  // ✅ Fetch Data
  const fetchEmployees = async () => {
    const res = await axios.get<User[]>(
      "http://localhost:5000/users"
    );
    setStudents(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Filter fields
  const fields = [
    { label: "Name", value: "name" },
    { label: "Status", value: "status" },
    { label: "Role", value: "role" },
  ];

  // ✅ Use reusable hook
  const {
    search,
    setSearch,
    field,
    setField,
    filteredData: filteredStudents,
  } = useFilter(students, "name");

  // ✅ Update total pages
  useEffect(() => {
    setTotalPages(Math.ceil(filteredStudents.length / pageSize));
  }, [filteredStudents]);

  // ✅ Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, field]);

  // ✅ Pagination
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Delete
  const handleDelete = async (student_id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    await axios.delete(`http://localhost:5000/users/${student_id}`);
    toast.success("Student Deleted Successfully");
    fetchEmployees();
  };

  return (
    <LayoutWrapper>
      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">User Management</h1>

          <Button
            onClick={() => router.push("/signup")}
            text="Create User"
          />
        </div>

        {/* ✅ Reusable Filter */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          field={field as string}
          setField={setField as any}
          fields={fields}
        />

        {/* Table */}
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Roles</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((std, index) => (
              <tr key={std.id}>
                <td className="border p-2">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="border p-2">{std.name}</td>
                <td className="border p-2">{std.status}</td>
                <td className="border p-2">{std.role}</td>
                <td className="border p-2">{std.phone}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => router.push(`/users/edit/${std.id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => router.push(`/users/view/${std.id}`)}
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
                <td colSpan={6} className="text-center p-4">
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