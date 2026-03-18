"use client";

import { useState } from "react";

export default function ModalExample() {

  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">

      {/* Open Modal Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Modal Title
            </h2>

            <p className="text-gray-600 mb-4">
              This is a Tailwind CSS modal popup example.
            </p>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}