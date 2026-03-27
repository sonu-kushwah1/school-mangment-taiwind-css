"use client";
import React from "react";

interface FilterField {
  label: string;
  value: string;
}

interface FilterProps {
  search: string;
  setSearch: (val: string) => void;
  field: string;
  setField: (val: string) => void;
  fields: FilterField[]; // 🔥 dynamic fields
}

const Filter: React.FC<FilterProps> = ({
  search,
  setSearch,
  field,
  setField,
  fields,
}) => {
  return (
    <div className="flex gap-3 mb-4">

      {/* Dropdown */}
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        {fields.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search by ${field}`}
        className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-[#ffa601]"
      />

      {/* Clear */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="bg-red-500 text-white px-3 rounded"
        >
          ✕
        </button>
      )}

    </div>
  );
};

export default Filter;