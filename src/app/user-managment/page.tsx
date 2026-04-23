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
import Modal from "@/component/modal";

// ✅ Filter
import { useFilter } from "@/hooks/useFilter";
import FilterBar from "@/component/Filter/FilterBar";

export default function EmployeeList() {
  const [students, setStudents] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Modal + Form state
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  const pageSize = 4;
  const router = useRouter();

  // ✅ Fetch
  const fetchEmployees = async () => {
    const res = await axios.get<User[]>("http://localhost:5000/users");
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

  // ✅ Filter hook
  const {
    search,
    setSearch,
    field,
    setField,
    filteredData: filteredStudents,
  } = useFilter(students, "name");

  // ✅ Pagination calc
  useEffect(() => {
    setTotalPages(Math.ceil(filteredStudents.length / pageSize));
  }, [filteredStudents]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, field]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Edit click
  const handleEdit = (user: User) => {
    setFormData(user);
    setOpen(true);
  };

  // ✅ Input change
  const handleChange = (key: keyof User, value: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // ✅ Update
  const handleUpdate = async () => {
    if (!formData) return;

    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    await axios.put(
      `http://localhost:5000/users/${formData.id}`,
      formData
    );

    toast.success("User Updated Successfully");
    setOpen(false);
    fetchEmployees();
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/users/${id}`);
    toast.success("Deleted Successfully");
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

        {/* Filter */}
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
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
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
                    onClick={() => handleEdit(std)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
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

      {/* Modal */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Update User"
      >
        {formData && (
          <div className="space-y-3">

            <input
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
            />

           <div>
            <label className="text-sm font-medium">Status</label>

            <select
              value={formData.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

            <select
              value={formData.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="manager">Student</option>
            </select>

            <input
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Phone"
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ToastContainer transition={Slide} theme="colored" />
    </LayoutWrapper>
  );
}