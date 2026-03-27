"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaChevronDown,
  FaBook,
  FaUserGraduate,
  FaUserTie,
  FaUserCircle,
  FaUser,
} from "react-icons/fa";
import { MdSchedule } from "react-icons/md";

export default function Sidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const pathname = usePathname();

  const [studentOpen, setStudentOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);
  const [classOpen, setClassOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const activeClass = "bg-[#063d7a]";
  const iconClass = "w-5 h-5 mr-2 text-[#ffa601]";

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen pt-16
      transition-all duration-300 overflow-hidden text-white
      ${sidebarOpen ? "w-64" : "w-0 lg:w-16"}`}
      style={{ background: "#042954" }}
    >
      <div className="px-5 py-4 font-bold text-lg border-b border-gray-700 whitespace-nowrap">
        {sidebarOpen ? "Dashboard" : "D"}
      </div>

      <nav className="p-3 space-y-2">
        {/* Dashboard */}
        <Link
          href="/"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/" ? activeClass : ""
          }`}
        >
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z"
            />
          </svg>
          {sidebarOpen && "Dashboard"}
        </Link>

        {/* Student */}
        <div>
          <button
            onClick={() => setStudentOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-lg text-[#ffa601]" />
              {sidebarOpen && "Student"}
            </div>

            {/* Arrow Icon */}
            {sidebarOpen && (
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  studentOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {studentOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                href="/student"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <FaBook className="text-[#ffa601]" />
                All Student
              </Link>

              <Link
                href="/student/admission-form"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <FaBook className="text-[#ffa601]" />
                Admission Form
              </Link>
              <Link
                href="/fees/fees-submit"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <FaBook className="text-[#ffa601]" />
                Fees Submit
              </Link>
            </div>
          )}
        </div>

        {/* Employee */}
        <div>
          <button
            onClick={() => setEmpOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center gap-2">
              <FaUserTie className="text-lg text-[#ffa601]" />
              {sidebarOpen && "Employee"}
            </div>

            {/* Arrow Icon */}
            {sidebarOpen && (
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  empOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {empOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                href="/emp"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <FaBook className="text-[#ffa601]" />
                Employee List
              </Link>
              <Link
                href="/emp-pagination"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <FaBook className="text-[#ffa601]" />
                Employee Pagination
              </Link>
            </div>
          )}
        </div>

        {/* Class */}
        <div>
          <button
            onClick={() => setClassOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center gap-2">
              <FaBook className="text-lg text-[#ffa601]" />
              {sidebarOpen && "Class"}
            </div>

            {/* Arrow Icon */}
            {sidebarOpen && (
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  classOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* Submenu */}
          {classOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                href="/class"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <FaBook className="text-[#ffa601]" />
                Class
              </Link>

              <Link
                href="/class-schedule"
                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                <MdSchedule className="text-[#ffa601]" />
                Class Schedule
              </Link>
            </div>
          )}
        </div>

        {/* reactDrapTable */}
        <Link
          href="/reactDrapTable"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/reactDrapTable" ? activeClass : ""
          }`}
        >
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {sidebarOpen && "ReactDrapTable"}
        </Link>

        {/* Fees */}
        <Link
          href="/fees"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/fees" ? activeClass : ""
          }`}
        >
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {sidebarOpen && "Fees"}
        </Link>

        {/* User */}
        <Link
          href="/user"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/user" ? activeClass : ""
          }`}
        >
          <FaUser className={iconClass} />

          {sidebarOpen && "User"}
        </Link>
        {/* Transport */}
        <Link
          href="/transport"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/transport" ? activeClass : ""
          }`}
        >
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="12" rx="2"></rect>
            <path d="M3 10h18"></path>
            <circle cx="7" cy="18" r="2"></circle>
            <circle cx="17" cy="18" r="2"></circle>
          </svg>
          {sidebarOpen && "Transport"}
        </Link>

        {/* Account */}
        <div>
          <button
            onClick={() => setAccountOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-lg text-[#ffa601]" />
              {sidebarOpen && "Account"}
            </div>

            {/* Arrow Icon */}
            {sidebarOpen && (
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  accountOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {accountOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                href="/expenses"
                className="block p-2 text-sm rounded hover:bg-[#063d7a]"
              >
                Expenses
              </Link>
            </div>
          )}
        </div>

        {/* Account */}

        {/* User Managment */}
        <Link
          href="/user-managment"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/user-managment" ? activeClass : ""
          }`}
        >
          <FaUser className={iconClass} />

          {sidebarOpen && "user-managment"}
        </Link>
        {/* Transport */}
      </nav>
    </aside>
  );
}
