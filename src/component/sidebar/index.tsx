"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z" />
          </svg>
          {sidebarOpen && "Dashboard"}
        </Link>

        {/* Student */}
        <div>
          <button
            onClick={() => setStudentOpen(prev => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7"/>
              </svg>
              {sidebarOpen && "Student"}
            </div>
            {sidebarOpen && <span>{studentOpen ? "▲" : "▼"}</span>}
          </button>

          {studentOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link href="/student" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                All Student
              </Link>
              <Link href="/student/admission-form" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                Admission Form
              </Link>
            </div>
          )}
        </div>

        {/* Employee */}
        <div>
          <button
            onClick={() => setEmpOpen(prev => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5V4H2v16h5"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6M12 16v4"/>
              </svg>
              {sidebarOpen && "Employee"}
            </div>
            {sidebarOpen && <span>{empOpen ? "▲" : "▼"}</span>}
          </button>

          {empOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link href="/emp" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                Employee List
              </Link>
              <Link href="/emp-pagination" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                Employee Pagination
              </Link>
            </div>
          )}
        </div>

        {/* Class */}
        <div>
          <button
            onClick={() => setClassOpen(prev => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V5a2 2 0 012-2h12v16H6a2 2 0 01-2-2.5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h6"/>
              </svg>
              {sidebarOpen && "Class"}
            </div>
            {sidebarOpen && <span>{classOpen ? "▲" : "▼"}</span>}
          </button>

          {classOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link href="/class" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                Class
              </Link>
              <Link href="/class-schedule" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                Class Schedule
              </Link>
            </div>
          )}
        </div>

        {/* Fees */}
        <Link
          href="/fees"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/fees" ? activeClass : ""
          }`}
        >
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          {sidebarOpen && "User"}
        </Link>

        {/* Transport */}
        <Link
          href="/transport"
          className={`flex items-center p-2 rounded hover:bg-[#063d7a] ${
            pathname === "/transport" ? activeClass : ""
          }`}
        >
          <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            onClick={() => setAccountOpen(prev => !prev)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#063d7a]"
          >
            <div className="flex items-center">
              <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V5a2 2 0 012-2h12v16H6a2 2 0 01-2-2.5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h6"/>
              </svg>
              {sidebarOpen && "Account"}
            </div>
            {sidebarOpen && <span>{accountOpen ? "▲" : "▼"}</span>}
          </button>

          {accountOpen && sidebarOpen && (
            <div className="ml-6 mt-2 space-y-1">
              <Link href="/expenses" className="block p-2 text-sm rounded hover:bg-[#063d7a]">
                Expenses
              </Link>
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
}