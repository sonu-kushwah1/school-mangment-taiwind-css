"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  age: number;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    email: "",
    course: "",
    age: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔄 Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/emp"
      );

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ➕ Create OR Update Student
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // UPDATE
      if (form.id) {
        await axios.put(
          `http://localhost:5001/api/emp/${form.id}`,
          {
            name: form.name,
            email: form.email,
            course: form.course,
            age: Number(form.age)
          }
        );

        setMessage("✅ Student updated successfully");
      }

      // CREATE
      else {
        await axios.post(
          "http://localhost:5001/api/emp",
          {
            name: form.name,
            email: form.email,
            course: form.course,
            age: Number(form.age)
          }
        );

        setMessage("✅ Student added successfully");
      }

      setForm({
        id: 0,
        name: "",
        email: "",
        course: "",
        age: ""
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Edit Student
  const handleEdit = (student: Student) => {
    setForm({
      id: student.id,
      name: student.name,
      email: student.email,
      course: student.course,
      age: String(student.age)
    });
  };

  // ❌ Delete Student
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/emp/${id}`
      );

      setMessage("🗑️ Student deleted successfully");

      fetchStudents();
    } catch (error) {
      console.log(error);
      setMessage("❌ Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Student Management
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Course"
            value={form.course}
            onChange={(e) =>
              setForm({
                ...form,
                course: e.target.value
              })
            }
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target.value
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {loading
              ? "Processing..."
              : form.id
              ? "Update Student"
              : "Add Student"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mb-4">
            {message}
          </p>
        )}

        {/* TABLE */}
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Course</th>
              <th className="p-2">Age</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-t text-center"
              >
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.course}</td>
                <td className="p-2">{s.age}</td>

                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(s.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}