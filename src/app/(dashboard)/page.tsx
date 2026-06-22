"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LayoutWrapper from "@/component/Layout";
import { api } from "@/api";
import { getAuthToken } from "@/utils/auth";

export default function DashboardPage() {
  const [students, setStudents] = useState(0);
  const [employees, setEmployees] = useState(0);

  const [user, setUser] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [usersList, setUsersList] = useState<any[]>([]);

  const studentAPI = process.env.NEXT_PUBLIC_API_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_STUDENT_API}` 
    : "http://localhost:5001/api/student";
  const employeeAPI = process.env.NEXT_PUBLIC_API_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/emp` 
    : "http://localhost:5001/api/emp";
  const USERS_API = "http://localhost:5001/api/auth/users"; // 🔥 users API

  // Fetch Students
  const getStudents = async () => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(studentAPI, { headers });
      console.log("students", res.data);
      const data = Array.isArray(res.data)
        ? res.data
        : (res.data && Array.isArray(res.data.data) ? res.data.data : []);
      setStudents(data.length);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch Employees
  const getEmployees = async () => {
    try {
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(employeeAPI, { headers });
      const data = Array.isArray(res.data)
        ? res.data
        : (res.data && Array.isArray(res.data.data) ? res.data.data : []);
      setEmployees(data.length);
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
      const token = getAuthToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(USERS_API, { headers });

      const responseData = res.data;
      const usersArray = Array.isArray(responseData)
        ? responseData
        : (responseData && Array.isArray(responseData.data) ? responseData.data : []);

      setUsersList(usersArray);
      setTotalUsers(usersArray.length);

      const active = usersArray.filter((u: any) => u.isActive !== false && u.status?.toLowerCase() !== "inactive").length;
      setActiveUsers(active);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getStudents();
    getEmployees();
    getUser(); // 👤
    getUsers(); // 📊
  }, []);

  // Helper for user avatar background color
  const getAvatarBgColor = (name: string) => {
    const bgColors = [
      "bg-blue-100 text-blue-800",
      "bg-emerald-100 text-emerald-800",
      "bg-purple-100 text-purple-800",
      "bg-indigo-100 text-indigo-800",
      "bg-rose-100 text-rose-800",
      "bg-amber-100 text-amber-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
    ];
    if (!name) return bgColors[0];
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return bgColors[hash % bgColors.length];
  };

  // Helper for initials
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <LayoutWrapper>
      {/* 👤 User Name */}
      <h1 className="text-2xl font-semibold mb-4">
        Welcome back, {user?.name || user?.fname || "Administrator"} 👋
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-6">
        <h3 className="text-2xl font-semibold">Dashboard Overview</h3>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Student */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 border-l-4 border-blue-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{students}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          </div>

          {/* Total Employees */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 border-l-4 border-purple-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Employees</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{employees}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 border-l-4 border-indigo-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalUsers}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 border-l-4 border-emerald-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{activeUsers}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Users Directory Card */}
      <div className="bg-white p-6 rounded shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-semibold">Users Directory</h3>
            <p className="text-sm text-gray-500 mt-1">List of registered users and their current system activity status</p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {usersList.length} Total Registered
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm font-semibold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usersList.length > 0 ? (
                usersList.map((usr: any, index: number) => {
                  const displayName = usr.fname || usr.name || "Anonymous User";
                  const isActive = usr.isActive !== false && usr.status?.toLowerCase() !== "inactive";
                  return (
                    <tr key={usr.id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarBgColor(displayName)}`}>
                          {getInitials(displayName)}
                        </div>
                        <span className="font-medium text-gray-800">{displayName}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{usr.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${usr.role === 'admin'
                          ? 'bg-red-50 text-red-700 border border-red-100'
                          : usr.role === 'teacher'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                          {usr.role || 'user'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No users found or error fetching users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutWrapper>
  );
}
