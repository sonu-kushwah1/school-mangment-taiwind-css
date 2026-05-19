"use client";
import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  age: number;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/students");

      if (!res.ok) throw new Error("Failed to fetch");

      const data: Student[] = await res.json();
      console.log(data);
      setStudents(data);
    } catch (err: any) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        
        <h1 className="text-2xl font-bold mb-4 text-center">
          Student List
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-blue-500">Loading...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Empty */}
        {!loading && students.length === 0 && (
          <p className="text-center text-gray-500">
            No students found
          </p>
        )}

        {/* Student Table */}
        {!loading && students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Age</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.course}</td>
                    <td className="p-3">{s.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}