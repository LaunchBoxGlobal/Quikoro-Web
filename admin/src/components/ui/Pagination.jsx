import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ pagination }) => {
  if (!pagination) return null;

  const {
    page = 1,
    totalPages = 1,
    hasNextPage = false,
    hasPrevPage = false,
  } = pagination;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || page;

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));

    setSearchParams(params);
  };

  const getPages = () => {
    if (totalPages <= 1) return [];

    const pages = [];
    const delta = 2;

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  const pages = getPages();

  return (
    <div className="w-full flex items-center justify-end gap-1 mt-8">
      <button
        disabled={!hasPrevPage}
        onClick={() => changePage(currentPage - 1)}
        className={`rounded px-2 h-8 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
          hasPrevPage
            ? "bg-gray-200 hover:text-white hover:bg-gradient-to-l from-[#0084AA] to-[#003544]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        <MdKeyboardArrowLeft size={20} />
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={`dots-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => changePage(p)}
            className={`rounded w-8 h-8 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
              currentPage === p
                ? "gradient-bg text-white"
                : "bg-gray-100 hover:text-white hover:bg-gradient-to-l from-[#0084AA] to-[#003544]"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={!hasNextPage}
        onClick={() => changePage(currentPage + 1)}
        className={`rounded px-2 h-8 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
          hasNextPage
            ? "bg-gray-200 hover:text-white hover:bg-gradient-to-l from-[#0084AA] to-[#003544]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        <MdKeyboardArrowRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
