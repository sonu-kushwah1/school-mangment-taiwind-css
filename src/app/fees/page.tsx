"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import axios from "axios";
import CommonDataTable from "@/component/DataTable";
import { Employee } from "@/types/employee";

type Fees = {
  id: any;
  classId: string;
  className: string;
  fees: number;
};

export default function FeesManager() {

    // ✅ Columns (IMPORTANT: library format)
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
      cell: (fees: Fees) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <button
             onClick={() => editFees(fees)}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>


          <button
             onClick={() => deleteFees(fees.id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const CLASS_API = "http://localhost:3001/class_list";
  const FEES_API = "http://localhost:3001/fees_list";

  const [classes, setClasses] = useState<any[]>([]);
  const [feesList, setFeesList] = useState<any[]>([]);

  const [classId, setClassId] = useState("");
  const [fees, setFees] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch Classes
  const getClasses = async () => {
    try {
      const res = await axios.get(CLASS_API);
      setClasses(res.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // ✅ Fetch Fees
  const getFees = async () => {
    try {
      const res = await axios.get(FEES_API);
      setFeesList(res.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  useEffect(() => {
    getClasses();
    getFees();
  }, []);

  // ✅ Add or Update Fees
  const saveFees = async () => {

    if (!classId || !fees) return;

    const className = classes.find((c) => c.id == classId)?.name;

    try {
      if (editId) {

        await axios.put(`${FEES_API}/${editId}`, {
          classId,
          className,
          fees
        });

        setEditId(null);

      } else {

        await axios.post(FEES_API, {
          classId,
          className,
          fees
        });
      }

      setClassId("");
      setFees("");
      getFees();

    } catch (error) {
      console.error("Error saving fees:", error);
    }
  };

  // ✅ Delete Fees
  const deleteFees = async (id: number) => {
    try {
      await axios.delete(`${FEES_API}/${id}`);
      getFees();
    } catch (error) {
      console.error("Error deleting fees:", error);
    }
  };

  // Edit Fees
  const editFees = (item: any) => {
    setClassId(item.classId);
    setFees(item.fees);
    setEditId(item.id);
  };

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-6">Class Wise Fees</h2>

        {/* Form */}
        <div className="flex gap-4 mb-6">

          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Class</option>

            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter Fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={saveFees}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Fees" : "Add Fees"}
          </button>

        </div>

         {/* ✅ Correct Table */}
              <CommonDataTable
                title="Fees List"
                data={feesList}
                columns={columns}
              />

      </div>
    </LayoutWrapper>
  );
}