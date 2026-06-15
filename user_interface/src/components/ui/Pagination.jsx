import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 hover:bg-gray-100 transition-all duration-300 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ChevronLeft size={16} />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 min-w-[40px] px-3 rounded-lg border font-medium transition-all
            ${
              currentPage === page
                ? "gradient-bg text-white border-primary"
                : "hover:bg-gray-100 bgwhite"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 hover:bg-gray-100 transition-all duration-300 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
