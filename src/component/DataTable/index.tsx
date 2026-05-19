"use client";

import { useState } from "react";
import DataTable from "react-data-table-component";

type Props<T> = {
  data: T[];
  columns: any;
  title?: string;
};

export default function CommonDataTable<T>({
  data = [],
  columns,
  title = "Data Table",
}: Props<T>) {

  const [search, setSearch] = useState("");

  // ✅ Safe filter
  const filteredData = Array.isArray(data)
    ? data.filter((item: any) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  // ✅ Table styles
  const customStyles = {

    headCells: {
      style: {
        backgroundColor: "#f3f4f6",
        fontWeight: "600",
        fontSize: "14px",
      },
    },

    rows: {
      style: {
        minHeight: "48px",
      },
    },
  };

  return (

    <div className="bg-white p-4 rounded-lg shadow">

      {/* Header */}
      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

    </div>
  );
}