"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import Button from "@/component/Button";

export default function EditEmployee() {
  const { id } = useParams(); // 👈 URL se id milega
  const router = useRouter();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "male",
    phone: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    address: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      <Breadcrumb />
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
        <div className="bg-white p-6 rounded shadow w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <InputField
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />

            <InputField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />

            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={(formData as any).email ?? ""}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Department"
              name="department"
              value={(formData as any).department ?? ""}
              onChange={handleChange}
              options={[
                { label: "Select Department", value: "" },
                { label: "HR", value: "HR" },
                { label: "IT", value: "IT" },
                { label: "Finance", value: "Finance" },
                { label: "Marketing", value: "Marketing" },
              ]}
            />

            <SelectField
              label="Designation"
              name="designation"
              value={(formData as any).designation ?? ""}
              onChange={handleChange}
              options={[
                { label: "Select Designation", value: "" },
                { label: "Manager", value: "Manager" },
                { label: "Developer", value: "Developer" },
                { label: "Analyst", value: "Analyst" },
                { label: "Designer", value: "Designer" },
              ]}
            />

            <InputField
              label="Salary"
              name="salary"
              type="number"
              value={(formData as any).salary ?? ""}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={(formData as any).address ?? ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <Button
                label="Update Employee"
                type="submit"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
