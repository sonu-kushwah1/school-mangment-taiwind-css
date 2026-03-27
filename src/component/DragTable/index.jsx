"use client";

import React from "react";
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

// 🔹 Header Component
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

// 🔹 Row Component
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
      className="hover:bg-gray-50 cursor-move"
    >
      {columns.map((col) => (
        <td key={col} className="px-4 py-2 border text-left">
          {row[col]}
        </td>
      ))}
    </tr>
  );
}

// 🔹 Main Component
export default function DragTable({ columns, data, setColumns, setData }) {

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Column Drag
    if (columns.includes(active.id)) {
      const oldIndex = columns.indexOf(active.id);
      const newIndex = columns.indexOf(over.id);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    } 
    // Row Drag
    else {
      const oldIndex = data.findIndex((r) => r.id === active.id);
      const newIndex = data.findIndex((r) => r.id === over.id);
      setData(arrayMove(data, oldIndex, newIndex));
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        
        <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
          <SortableContext items={data.map((r) => r.id)} strategy={verticalListSortingStrategy}>
            
            <table className="min-w-full table-fixed border-collapse">
              
              {/* Header */}
              <thead>
                <tr>
                  {columns.map((col) => (
                    <SortableHeader key={col} id={col} />
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {data.map((row) => (
                  <SortableRow key={row.id} row={row} columns={columns} />
                ))}
              </tbody>

            </table>

          </SortableContext>
        </SortableContext>

      </DndContext>
    </div>
  );
}