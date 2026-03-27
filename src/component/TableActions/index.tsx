"use client";

import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface TableActionsProps {
  id: number | string;

  onEdit?: (id: number | string) => void;
  onView?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;

  showEdit?: boolean;
  showView?: boolean;
  showDelete?: boolean;
}

export default function TableActions({
  id,
  onEdit,
  onView,
  onDelete,
  showEdit = true,
  showView = true,
  showDelete = true,
}: TableActionsProps) {
  return (
    <div className="flex gap-2">

      {/* Edit */}
      {showEdit && onEdit && (
        <button
          onClick={() => onEdit(id)}
          className="p-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          <FaEdit size={14} />
        </button>
      )}

      {/* View */}
      {showView && onView && (
        <button
          onClick={() => onView(id)}
          className="p-2 rounded bg-gray-600 text-white hover:bg-gray-700"
        >
          <FaEye size={14} />
        </button>
      )}

      {/* Delete */}
      {showDelete && onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="p-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          <FaTrash size={14} />
        </button>
      )}

    </div>
  );
}