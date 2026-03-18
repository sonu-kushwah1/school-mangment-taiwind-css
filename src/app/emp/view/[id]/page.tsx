"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";

export default function ViewEmployee() {
  const { id } = useParams();
  const router = useRouter();

  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/emp_list/${id}`);
        setEmployee(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div className="p-6">Loading...</div>;
  }

  return (
   <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">View Employee</h1>

          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {employee.id}
            </p>
            <p>
              <strong>First Name:</strong> {employee.fname}
            </p>
            <p>
              <strong>Last Name:</strong> {employee.lname}
            </p>
            <p>
              <strong>Gender:</strong> {employee.gender}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/emp")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
   </LayoutWrapper>
  );
}
