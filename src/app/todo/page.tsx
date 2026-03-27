"use client";
import { useState } from "react";

export default function Todo() {
  const [item, setItem] = useState("");
const [list, setList] = useState<string[]>([]);

  const addItem = () => {
    // if (!item.trim()) return;
    setList([...list, item]);
    setItem("");
  };

  const deleteItem = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">

        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">
          📝 To Do App
        </h2>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffa601]"
          />

          <button
            onClick={addItem}
            className="bg-[#ffa601] text-white px-4 py-2 rounded hover:bg-[#e69500]"
          >
            Add
          </button>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {list.map((i, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-2 rounded border"
            >
              <span>{i}</span>

              <button
                onClick={() => deleteItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}