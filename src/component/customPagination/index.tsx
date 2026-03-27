import React from "react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border text-sm
        ${
          currentPage === 1
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "border-[#ffa601] text-[#042954] hover:bg-[#ffa601] hover:text-white"
        }`}
      >
        Previous
      </button>

      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            className={`min-w-[2.25rem] px-2 py-1 rounded-md text-sm border transition
            ${
              page === currentPage
                ? "bg-[#ffa601] border-[#ffa601] text-white"
                : "border-[#ffa601] text-[#042954] hover:bg-[#ffa601] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border text-sm
        ${
          currentPage === totalPages
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "border-[#ffa601] text-[#042954] hover:bg-[#ffa601] hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;