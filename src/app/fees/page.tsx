"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";

export default function FeesManager() {

  const CLASS_API = "http://localhost:3001/class_list";
  const FEES_API = "http://localhost:3001/fees_list";

  const [classes, setClasses] = useState<any[]>([]);
  const [feesList, setFeesList] = useState<any[]>([]);

  const [classId, setClassId] = useState("");
  const [fees, setFees] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch Classes
  const getClasses = async () => {
    const res = await fetch(CLASS_API);
    const data = await res.json();
    setClasses(data);
  };

  // Fetch Fees
  const getFees = async () => {
    const res = await fetch(FEES_API);
    const data = await res.json();
    setFeesList(data);
  };

  useEffect(() => {
    getClasses();
    getFees();
  }, []);

  // Add or Update Fees
  const saveFees = async () => {

    if (!classId || !fees) return;

    const className = classes.find((c) => c.id == classId)?.name;

    if (editId) {

      await fetch(`${FEES_API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId,
          className,
          fees
        })
      });

      setEditId(null);

    } else {

      await fetch(FEES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId,
          className,
          fees
        })
      });
    }

    setClassId("");
    setFees("");
    getFees();
  };

  // Delete Fees
  const deleteFees = async (id: number) => {
    await fetch(`${FEES_API}/${id}`, {
      method: "DELETE"
    });

    getFees();
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

        {/* Fees Table */}

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Class</th>
              <th className="border p-2 text-left">Fees</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {feesList.map((item,index) => (
              <tr key={item.id}>

                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.className}</td>
                <td className="border p-2">{item.fees}</td>

                <td className="border p-2 space-x-2">

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

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </LayoutWrapper>
  );
}