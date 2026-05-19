"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import InputField from "@/component/InputFiled";

export default function ClassManager() {

  // ✅ API URL
  const API = "http://localhost:5001/api/class";

  // ✅ States
  const [classInput, setClassInput] = useState("");

  const [classes, setClasses] = useState<any[]>([]);

  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch Classes
  const fetchClasses = async () => {

    try {

      const response = await axios.get(API);

      console.log("FETCH RESPONSE:", response.data);

      // ✅ Backend response support
      if (response.data.data) {

        setClasses(response.data.data);

      } else {

        setClasses(response.data);

      }

    } catch (error) {

      console.log("FETCH ERROR:", error);

    }
  };

  // ✅ Load Classes
  useEffect(() => {

    fetchClasses();

  }, []);

  // ✅ Add / Update Class
  const handleAddClass = async () => {

    if (!classInput.trim()) {

      alert("Please enter class name");

      return;
    }

    try {

      // ✅ UPDATE
      if (editId !== null) {

        await axios.put(`${API}/${editId}`, {
          className: classInput,
        });

        alert("Class updated successfully");

        setEditId(null);

      }

      // ✅ CREATE
      else {

        await axios.post(API, {
          className: classInput,
        });

        alert("Class added successfully");

      }

      // ✅ Reset
      setClassInput("");

      // ✅ Refresh List
      fetchClasses();

    } catch (error) {

      console.log("SAVE ERROR:", error);

      alert("Something went wrong");

    }
  };

  // ✅ Delete Class
  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/${id}`);

      alert("Class deleted successfully");

      fetchClasses();

    } catch (error) {

      console.log("DELETE ERROR:", error);

      alert("Delete failed");

    }
  };

  // ✅ Edit Class
  const handleEdit = (cls: any) => {

    setClassInput(cls.className);

    setEditId(cls.id);

  };

  return (

    <LayoutWrapper>

      <Breadcrumb />

      <div className="bg-white p-6 rounded-lg shadow-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Class Manager
          </h2>

        </div>

        {/* Input Section */}
        <div className="flex gap-4 mb-6">

          <div className="flex-1">

            <InputField
              type="text"
              placeholder="Enter Class Name"
              value={classInput}
              onChange={(e) =>
                setClassInput(e.target.value)
              }
            />

          </div>

          <button
            onClick={handleAddClass}
            className={`px-5 py-2 rounded text-white font-medium ${
              editId !== null
                ? "bg-blue-500"
                : "bg-yellow-500"
            }`}
          >
            {editId !== null
              ? "Update Class"
              : "Add Class"}
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse border">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3 text-left">
                  #
                </th>

                <th className="border p-3 text-left">
                  Class Name
                </th>

                <th className="border p-3 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {classes.length > 0 ? (

                classes.map((cls, index) => (

                  <tr key={cls.id}>

                    <td className="border p-3">
                      {index + 1}
                    </td>

                    <td className="border p-3">
                      {cls.className}
                    </td>

                    <td className="border p-3 space-x-2">

                      <button
                        onClick={() =>
                          handleEdit(cls)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(cls.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={3}
                    className="text-center p-4"
                  >
                    No Classes Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </LayoutWrapper>
  );
}