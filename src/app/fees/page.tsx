"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import axios from "axios";
import CommonDataTable from "@/component/DataTable";

type Fees = {
  id: number;
  classId: string;
  className: string;
  fees: number;
};

type ClassItem = {
  id: number;
  className: string;
};

export default function FeesManager() {

  // ✅ API URLs
  const CLASS_API = "http://localhost:5001/api/class";
  const FEES_API = "http://localhost:5001/api/fees";

  // ✅ States
  const [classes, setClasses] = useState<ClassItem[]>([]);

  const [feesList, setFeesList] = useState<Fees[]>([]);

  const [classId, setClassId] = useState("");

  const [fees, setFees] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Table Columns
  const columns = [

    {
      name: "ID",
      cell: (_: Fees, index: number) => index + 1,
      width: "80px",
    },

    {
      name: "Class Name",
      selector: (row: Fees) => row.className,
      sortable: true,
    },

    {
      name: "Fees",
      selector: (row: Fees) => row.fees,
      sortable: true,
    },

    {
      name: "Actions",

      cell: (item: Fees) => (

        <div className="flex gap-2">

          <button
            onClick={() => editFees(item)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => deleteFees(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>
      ),
    },
  ];

  // ✅ Fetch Classes
  const getClasses = async () => {

    try {

      const res = await axios.get(CLASS_API);

      console.log("CLASS RESPONSE:", res.data);

      // ✅ Handle backend structure
      setClasses(res.data.data || []);

    } catch (error) {

      console.error("Error fetching classes:", error);

      setClasses([]);

    }
  };

  // ✅ Fetch Fees
  const getFees = async () => {

    try {

      const res = await axios.get(FEES_API);

      console.log("FEES RESPONSE:", res.data);

      // ✅ Handle backend structure
      setFeesList(res.data.data || []);

    } catch (error) {

      console.error("Error fetching fees:", error);

      setFeesList([]);

    }
  };

  // ✅ Initial Load
  useEffect(() => {

    getClasses();

    getFees();

  }, []);

  // ✅ Add / Update Fees
  const saveFees = async () => {

    if (!classId || !fees) {

      alert("Please fill all fields");

      return;
    }

    // ✅ Get Class Name
    const className = classes.find(
      (c) => c.id == Number(classId)
    )?.className;

    try {

      // ✅ UPDATE
      if (editId !== null) {

        await axios.put(`${FEES_API}/${editId}`, {
          classId,
          className,
          fees,
        });

        alert("Fees updated successfully");

        setEditId(null);

      }

      // ✅ CREATE
      else {

        await axios.post(FEES_API, {
          classId,
          className,
          fees,
        });

        alert("Fees added successfully");

      }

      // ✅ Reset Form
      setClassId("");

      setFees("");

      // ✅ Refresh Data
      getFees();

    } catch (error) {

      console.error("Error saving fees:", error);

      alert("Something went wrong");

    }
  };

  // ✅ Delete Fees
  const deleteFees = async (id: number) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${FEES_API}/${id}`);

      alert("Fees deleted successfully");

      getFees();

    } catch (error) {

      console.error("Error deleting fees:", error);

      alert("Delete failed");

    }
  };

  // ✅ Edit Fees
  const editFees = (item: Fees) => {

    setClassId(item.classId);

    setFees(String(item.fees));

    setEditId(item.id);

  };

  return (

    <LayoutWrapper>

      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">
          Class Wise Fees
        </h2>

        {/* Form */}
        <div className="flex gap-4 mb-6">

          {/* Class Dropdown */}
          <select
            value={classId}
            onChange={(e) =>
              setClassId(e.target.value)
            }
            className="border p-2 rounded w-60"
          >

            <option value="">
              Select Class
            </option>

            {classes.map((c) => (

              <option
                key={c.id}
                value={c.id}
              >
                {c.className}
              </option>

            ))}

          </select>

          {/* Fees Input */}
          <input
            type="number"
            placeholder="Enter Fees"
            value={fees}
            onChange={(e) =>
              setFees(e.target.value)
            }
            className="border p-2 rounded"
          />

          {/* Button */}
          <button
            onClick={saveFees}
            className={`text-white px-4 py-2 rounded ${
              editId !== null
                ? "bg-blue-500"
                : "bg-yellow-500"
            }`}
          >
            {editId !== null
              ? "Update Fees"
              : "Add Fees"}
          </button>

        </div>

        {/* Table */}
        <CommonDataTable
          title="Fees List"
          data={feesList}
          columns={columns}
        />

      </div>

    </LayoutWrapper>
  );
}