"use client";
import { useState } from "react";

export default function ToggleText() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-6">

      <button
        onClick={() => setShow(!show)}
        className="bg-[#042954] text-white px-4 py-2 rounded"
      >
        {show ? "Hide Text" : "Show Text"}
      </button>

      {show && (
        <p className="mt-4 text-gray-700">
          This is the hidden text 👀
        </p>
      )}

    </div>
  );
}