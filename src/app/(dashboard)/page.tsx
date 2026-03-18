"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";

export default function DashboardPage() {

  const [students, setStudents] = useState(0);
  const [employees, setEmployees] = useState(0);

  const STUDENT_API = "http://localhost:3001/student_list";
  const EMP_API = "http://localhost:3001/emp_list";

  // Fetch Students
  const getStudents = async () => {
    const res = await fetch(STUDENT_API);
    const data = await res.json();
    setStudents(data.length);
  };

  // Fetch Employees
  const getEmployees = async () => {
    const res = await fetch(EMP_API);
    const data = await res.json();
    setEmployees(data.length);
  };

  useEffect(() => {
    getStudents();
    getEmployees();
  }, []);

  return (
    <LayoutWrapper>
      <div className="space-y-6">

        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Student */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Student</h3>
            <p className="text-2xl font-bold mt-2">{students}</p>
          </div>

          {/* Total Employees */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Employees</h3>
            <p className="text-2xl font-bold mt-2">{employees}</p>
          </div>

          {/* Teacher (static for now) */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Teacher</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <p className="text-2xl font-bold mt-2">0</p>
          </div>

        </div>

      </div>
    </LayoutWrapper>
  );
}