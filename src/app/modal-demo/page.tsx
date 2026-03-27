"use client";
import Modal from "@/component/modal";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Logout Confirmation"
      >
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Logged out");
              setOpen(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </Modal>
    </div>
  );
}