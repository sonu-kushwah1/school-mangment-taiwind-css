"use client";
import { api } from "@/api";
import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import { getRandomBorderColor } from "@/utils/randomColor";
import InputField from "@/component/InputFiled";
import axios from "axios";

export default function ClassManager() {

  const [color] = useState(getRandomBorderColor());

  const API = api.classList;

  const [classInput, setClassInput] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch Classes (Axios)
  const fetchClasses = async () => {
    try {
      const res = await axios.get(API);
      setClasses(res.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ✅ Add or Update Class (Axios)
  const handleAddClass = async () => {
    if (!classInput) return;

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, {
          name: classInput,
        });
        setEditId(null);
      } else {
        await axios.post(API, {
          name: classInput,
        });
      }

      setClassInput("");
      fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  // ✅ Delete Class (Axios)
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  // Edit Class
  const handleEdit = (cls: any) => {
    setClassInput(cls.name);
    setEditId(cls.id);
  };

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-6">Class Manager</h2>

        {/* Add Class */}
        <div className="flex gap-4 mb-6">
          
          <InputField
            type="text"
            placeholder="Enter Class"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
          />

          <button
            onClick={handleAddClass}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Class" : "Add Class"}
          </button>
        </div>

        {/* Table */}
        <table
          className="w-full border"
          style={{ "--row-border": color } as React.CSSProperties}
        >
          <thead className="bg-gray-100">
            <tr className="border-l-[5px] border-[var(--row-border)]">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Class Name</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((cls, index) => (
              <tr
                className="bg-white border-l-[5px] border-[var(--row-border)]"
                key={cls.id}
              >
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{cls.name}</td>

                <td className="border p-2 space-x-2">
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