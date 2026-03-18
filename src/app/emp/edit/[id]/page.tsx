"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { LayoutRouter } from "next/dist/server/app-render/entry-base";
import LayoutWrapper from "@/component/Layout";

export default function EditEmployee() {
  const { id } = useParams(); // 👈 URL se id milega
  const router = useRouter();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "male",
    phone: "",
  });

  // ✅ Fetch record by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/emp_list/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update record
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/emp_list/${id}`, formData);

      alert("Employee Updated Successfully");
      router.push("/emp");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
