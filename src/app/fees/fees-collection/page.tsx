"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import CommonDataTable from "@/component/DataTable";
import { api } from "@/api";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type StudentFee = {
  id: string;
  student_id: string;
  student_name: string;
  student_class: string;
  total_fees: string;
  paid_fees: string;
  due_fees: string;
  payment_method: string;
  date: string;
};

export default function FeesCollectionList() {
  const [feeRecords, setFeeRecords] = useState<StudentFee[]>([]);
  const router = useRouter();

  const API = "http://localhost:5001/api/studentfees";

  // ✅ Fetch
  const fetchFeeRecords = async () => {
    try {
      const res = await axios.get(API);
      console.log("Fetched fee records:", res.data);
      setFeeRecords(res.data);
    } catch {
      toast.error("Failed to fetch fee records");
    }
  };

  useEffect(() => {
    fetchFeeRecords();
  }, []);

  // ✅ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this fee record?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Deleted successfully");
      fetchFeeRecords();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ Columns (IMPORTANT: library format)
  const columns = [
    {
      name: "S.No",
      cell: (_: StudentFee, index: number) => index + 1,
      width: "80px",
    },
    // {
    //   name: "Student ID",
    //   selector: (row: StudentFee) => row.student_id,
    //   sortable: true,
    // },
    {
      name: "Student Name",
      selector: (row: StudentFee) => row.student_name,
      sortable: true,
    },
    {
      name: "Student Class",
      selector: (row: StudentFee) => row.student_class,
      sortable: true,
    },
    {
      name: "Total Fees",
      selector: (row: StudentFee) => row.total_fees,
      sortable: true,
    },
    {
      name: "Paid Fees",
      selector: (row: StudentFee) => row.paid_fees,
      sortable: true,
    },
    {
      name: "Due Fees",
      selector: (row: StudentFee) => row.due_fees,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row: StudentFee) => row.payment_method,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: StudentFee) => (row.date ? row.date.split("T")[0] : ""),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: StudentFee) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
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

      <div className="bg-white p-6 rounded shadow">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Student Fees Record</h1>

          <button
            onClick={() => router.push("/fees/fees-submit")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Fees
          </button>
        </div>

        {/* ✅ Correct Table */}
        <CommonDataTable
          title="Fees Collection List"
          data={feeRecords}
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
