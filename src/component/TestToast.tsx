import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TestToast: React.FC = () => {
  const handleShowToast = () => {
    toast.success("This is a test toast notification!");
  };

  return (
    <div className="p-4">
      <button
        onClick={handleShowToast}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Show Test Toast
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TestToast;
