"use client";
import { api } from "@/api/api";
import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";

export default function ClassManager() {

  const API = api.classList;

  const [classInput, setClassInput] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch Classes
  const fetchClasses = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Add or Update Class
  const handleAddClass = async () => {
    if (!classInput) return;

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: classInput,
        }),
      });

      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: classInput,
        }),
      });
    }

    setClassInput("");
    fetchClasses();
  };

  // Delete Class
  const handleDelete = async (id: number) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchClasses();
  };

  // Edit Class
  const handleEdit = (cls: any) => {
    setClassInput(cls.name);
    setEditId(cls.id);
  };

  return (
    <LayoutWrapper>
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-6">Class Manager</h2>

        {/* Add Class */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Class"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
            className="border p-2 rounded w-64"
          />

          <button
            onClick={handleAddClass}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Class" : "Add Class"}
          </button>
        </div>

        {/* Select Dropdown */}
        {/* <div className="mb-6">
          <label className="block mb-2">Select Class</label>
          <select className="border p-2 rounded w-64">
            <option>Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div> */}

        {/* Table */}
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Class Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td className="border p-2">{cls.id}</td>
                <td className="border p-2">{cls.name}</td>

                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </LayoutWrapper>
  );
}