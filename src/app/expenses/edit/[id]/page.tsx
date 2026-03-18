"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function EditExpense() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState<Expense>({
    id: "",
    name: "",
    idNo: "",
    expenseType: "",
    amount: 0,
    phone: "",
    status: "",
    date: "",
  });

  // fetch single expense
  const fetchExpense = async () => {
    try {

      const res = await axios.get<Expense>(
        `http://localhost:3001/expenses_list/${id}`
      );

      setFormData(res.data);

    } catch (error) {

      console.error("Fetch Error", error);

    }
  };

  useEffect(() => {

    fetchExpense();

  }, []);

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // update expense
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:3001/expenses_list/${id}`,
        formData
      );

      toast.success("Expense Updated Successfully");

      setTimeout(() => {
        router.push("/expenses");
      }, 1500);

    } catch (error) {

      toast.error("Update Failed");

    }

  };

  return (

    <LayoutWrapper>

      <Breadcrumb />

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-2xl font-bold mb-6">
          Edit Expense
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
          />

          <input
            name="idNo"
            value={formData.idNo}
            onChange={handleChange}
            placeholder="ID No"
            className="border p-2 rounded"
          />

          <input
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            placeholder="Expense Type"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>

          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="md:col-span-2">

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Update Expense
            </button>

          </div>

        </form>

      </div>

      <ToastContainer />

    </LayoutWrapper>

  );
}