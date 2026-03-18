"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import CustomPagination from "@/component/customPagination";
import Breadcrumb from "@/component/Breadcrumb";

interface Expense {
  id: string;
  name: string;
  idNo: string;
  expenseType: string;
  amount: number;
  phone: string;
  status: string;
  date: string;
}

export default function ExpenseList() {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 5;
  const router = useRouter();

  const fetchExpenses = async (page = 1) => {

    try {

      const res = await axios.get<Expense[]>(
        "http://localhost:3001/expenses_list"
      );

      setExpenses(res.data);

      setTotalPages(Math.ceil(res.data.length / pageSize));

    } catch (error) {

      console.error("Fetch Error", error);

    }

  };

  useEffect(() => {

    fetchExpenses(currentPage);

  }, [currentPage]);

  const paginatedExpenses = expenses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = async (id: string) => {

    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {

      await axios.delete(
        `http://localhost:3001/expenses_list/${id}`
      );

      toast.success("Expense Deleted Successfully");

      fetchExpenses();

    } catch (error) {

      toast.error("Delete Failed");

    }

  };

  return (

    <LayoutWrapper>

      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">

        <div className="flex justify-between mb-4">

          <h1 className="text-2xl font-bold">
            Expense List
          </h1>

          <button
            onClick={() => router.push("/expenses/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Expense
          </button>

        </div>

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">ID No</th>
              <th className="border p-2">Expense Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>

            </tr>

          </thead>

          <tbody>

            {paginatedExpenses.map((exp,index) => (

              <tr key={index}>

                <td className="border p-2">{index+1}</td>

                <td className="border p-2">{exp.name}</td>

                <td className="border p-2">{exp.idNo}</td>

                <td className="border p-2">{exp.expenseType}</td>

                <td className="border p-2">
                  ₹{exp.amount}
                </td>

                <td className="border p-2">
                  {exp.phone}
                </td>


                <td className="border p-2">
                  {exp.status}
                </td>

                <td className="border p-2">
                  {exp.date}
                </td>

                <td className="border p-2 space-x-2">

                  <button
                    onClick={() =>
                      router.push(`/expenses/edit/${exp.id}`)
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/expenses/view/${exp.id}`)
                    }
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(exp.id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="colored"
      />

    </LayoutWrapper>

  );

}