"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LayoutWrapper from "@/component/Layout";

export default function DashboardPage() {

  const [students, setStudents] = useState(0);
  const [employees, setEmployees] = useState(0);

  const [user, setUser] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  const STUDENT_API = "http://localhost:3001/student_list";
  const EMP_API = "http://localhost:3001/emp_list";

  const USERS_API = "http://localhost:5000/users"; // 🔥 users API

  // Fetch Students
  const getStudents = async () => {
    try {
      const res = await axios.get(STUDENT_API);
      setStudents(res.data.length);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch Employees
  const getEmployees = async () => {
    try {
      const res = await axios.get(EMP_API);
      setEmployees(res.data.length);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // 🔥 Get logged user
  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // 🔥 Fetch Users (total + active)
  const getUsers = async () => {
    try {
      const res = await axios.get(USERS_API);

      const users = res.data;

      setTotalUsers(users.length);

      const active = users.filter((u: any) => u.isActive === true).length;
      setActiveUsers(active);

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getStudents();
    getEmployees();
    getUser();       // 👤
    getUsers();      // 📊
  }, []);

  return (
    <LayoutWrapper>

      {/* 👤 User Name */}
      <h1 className="text-2xl font-semibold mb-4">
        Welcome back, {user?.name || "Administrator"} 👋
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-6 ">

        <h3 className="text-2xl font-semibold">Dashboard Overview</h3>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Student */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Student</h3>
            <p className="text-2xl font-bold mt-2">{students}</p>
          </div>

          {/* Total Employees */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Employees</h3>
            <p className="text-2xl font-bold mt-2">{employees}</p>
          </div>

          {/* Total Users 🔥 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold mt-2">{totalUsers}</p>
          </div>

          {/* Active Users 🔥 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <p className="text-2xl font-bold mt-2">{activeUsers}</p>
          </div>

        </div>

      </div>

    </LayoutWrapper>
  );
}