"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import Button from "@/component/Button";

const CreateUser = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/user_list", formData);

      alert("User Created Successfully");

      router.push("/user");

    } catch (error) {
      console.log(error);
      alert("Error creating user");
    }
  };

  return (
    <LayoutWrapper>
      <Breadcrumb />

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <Button label="Save User" type="submit" />

        </form>
      </div>

    </LayoutWrapper>
  );
};

export default CreateUser;