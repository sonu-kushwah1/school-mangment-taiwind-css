"use client";

import axios from "axios";
import Breadcrumb from "@/component/Breadcrumb";
import LayoutWrapper from "@/component/Layout";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import React, { useState } from "react";

const User = () => {
  const router = useRouter();

  // state with type
  const [user, setUser] = React.useState<User[]>([]);
  const [name, setName] = useState([]);

  // fetch user function
  const fetchUser = async () => {
    const res = await axios.get<User[]>("http://localhost:3001/user_list");
    setUser(res.data);
  };

  // run on component load
  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <LayoutWrapper>
    
      <Breadcrumb />
      <button
        onClick={() => router.push("/user/create")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add New Emp
      </button>
      <table className="border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {user.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.phone}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutWrapper>
  );
};

export default User;
