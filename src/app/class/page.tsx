"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import InputField from "@/component/InputFiled";
import CommonDataTable from "@/component/DataTable";
import { Slide, toast, ToastContainer } from "react-toastify";

type ClassItem = {
  id: number;
  className: string;
};

export default function ClassManager() {
  // ✅ API URL
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_CLASS_API}`;

  // ✅ States
  const [classInput, setClassInput] = useState("");
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch Classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get(API);

      console.log("FETCH RESPONSE:", response.data);

      // Handle different response structures
      if (response.data.data) {
        setClasses(response.data.data);
      } else {
        setClasses(response.data);
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      setClasses([]);
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
      // UPDATE
      if (editId !== null) {
        await axios.put(`${API}/${editId}`, {
          className: classInput,
        });

        toast.success("Class Updated successfully");
        alert("Class updated successfully");
        setEditId(null);
      }
      // CREATE
      else {
        await axios.post(API, {
          className: classInput,
        });
        toast.success("Class added successfully");
        alert("Class added successfully");
      }

      // Reset form
      setClassInput("");

      // Refresh data
      fetchClasses();
    } catch (error) {
      console.error("SAVE ERROR:", error);
      alert("Something went wrong");
    }
  };

  // ✅ Delete Class
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);
      alert("Class deleted successfully");
      toast.success("Class deleted successfully");
      fetchClasses();
    } catch (error) {
      console.error("DELETE ERROR:", error);

      alert("Delete failed");
      toast.error("Delete failed");
    }
  };

  // ✅ Edit Class
  const handleEdit = (cls: ClassItem) => {
    setClassInput(cls.className);
    setEditId(cls.id);
  };

  // ✅ DataTable Columns
  const columns = [
    {
      name: "ID",
      cell: (_: ClassItem, index: number) => index + 1,
      width: "80px",
    },
    {
      name: "Class Name",
      selector: (row: ClassItem) => row.className,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (cls: ClassItem) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(cls)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(cls.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Class Manager
          </h2>
        </div>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <InputField
              type="text"
              placeholder="Enter Class Name"
              value={classInput}
              onChange={(e) => setClassInput(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddClass}
            className={`px-5 py-2 rounded text-white font-medium min-w-[140px] ${editId !== null
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-yellow-500 hover:bg-yellow-600"
              }`}
          >
            {editId !== null
              ? "Update Class"
              : "Add Class"}
          </button>
        </div>

        {/* Data Table */}
        <CommonDataTable
          title="Class List"
          data={classes}
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