"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";

export default function ViewEmployee() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/student_list/${id}`);
        setStudent(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  if (!student) {
    return <div className="p-6">Loading...</div>;
  }

  return (
   <LayoutWrapper>
    <Breadcrumb />
      <div className="min-h-screen bg-gray-50 flex justify-center p-6">
        <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center">View Employee</h1>

          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {student.id}
            </p>
            <p>
              <strong>First Name:</strong> {student.fname}
            </p>
            <p>
              <strong>Last Name:</strong> {student.lname}
            </p>
            <p>
              <strong>Gender:</strong> {student.gender}
            </p>
            <p>
              <strong>Phone:</strong> {student.phone}
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/student")}
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
