"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import CommonDataTable from "@/component/DataTable";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchEmployees,
  deleteEmployee,
} from "@/redux/empSlice";

type Employee = {
  id: string;
  fname: string;
  lname: string;
  gender: string;
  phone: string;
};

export default function EmployeeList() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { employees, loading, error } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this employee?")) return;

    try {
      await dispatch(deleteEmployee(id)).unwrap();
      toast.success("Deleted successfully");
      dispatch(fetchEmployees());
    } catch {
      toast.error("Delete failed");
    }
  };

  const columns = [
    {
      name: "ID",
      cell: (_: Employee, index: number) => index + 1,
      width: "80px",
    },
    {
      name: "First Name",
      selector: (row: Employee) => row.fname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: Employee) => row.lname,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: Employee) => row.gender,
    },
    {
      name: "Mobile",
      selector: (row: Employee) => row.phone,
    },
    {
      name: "Actions",
      cell: (emp: Employee) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <button
            onClick={() => router.push(`/employee-redux/edit/${emp.id}`)}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => router.push(`/employee-redux/view/${emp.id}`)}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            View
          </button>

          <button
            onClick={() => handleDelete(emp.id)}
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
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Employees CRUD</h1>

          <button
            onClick={() => router.push("/employee-redux/create")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Emp
          </button>
        </div>

        <CommonDataTable
          title={loading ? "Loading..." : "Employee List"}
          data={employees}
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