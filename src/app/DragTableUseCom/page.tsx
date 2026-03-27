"use client";

import React, { useState } from "react";
import DragTable from "@/component/DragTable";

export default function Page() {
  const [columns, setColumns] = useState(["role", "age", "name"]);

  const [data, setData] = useState([
    { id: "1", name: "Amit", age: 25, role: "Dev" },
    { id: "2", name: "Rahul", age: 28, role: "Manager" },
    { id: "3", name: "Neha", age: 22, role: "Designer" }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Employee Table</h1>

      <DragTable
        columns={columns}
        data={data}
        setColumns={setColumns}
        setData={setData}
      />
    </div>
  );
}