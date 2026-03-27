"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

// 🔹 Header
function SortableHeader({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="px-4 py-2 border bg-gray-100 text-left font-semibold cursor-move"
    >
      {id.toUpperCase()}
    </th>
  );
}

// 🔹 Row
function SortableRow({ row, columns }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move"
    >
      {columns.map((col) => (
        <td key={col} className="px-4 py-2 border">
          {row[col]}
        </td>
      ))}
    </tr>
  );
}

export default function Page() {
  const [columns, setColumns] = useState(["role", "age", "name"]);
  const [rows, setRows] = useState([
    { id: "1", name: "Amit", age: 25, role: "Dev" },
    { id: "2", name: "Rahul", age: 28, role: "Manager" },
    { id: "3", name: "Neha", age: 22, role: "Designer" }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // 🔥 Check: column drag or row drag
    if (columns.includes(active.id)) {
      const oldIndex = columns.indexOf(active.id);
      const newIndex = columns.indexOf(over.id);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    } else {
      const oldIndex = rows.findIndex((r) => r.id === active.id);
      const newIndex = rows.findIndex((r) => r.id === over.id);
      setRows(arrayMove(rows, oldIndex, newIndex));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Drag & Drop Table</h2>

      <div className="overflow-x-auto border rounded shadow">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          
          {/* Column Context */}
          <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
            
            {/* Row Context */}
            <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
              
              <table className="min-w-full table-fixed border-collapse">
                
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <SortableHeader key={col} id={col} class="text-left"/>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <SortableRow key={row.id} row={row} columns={columns} />
                  ))}
                </tbody>

              </table>

            </SortableContext>
          </SortableContext>

        </DndContext>
      </div>
    </div>
  );
}