import { useState } from "react";
import { filters } from "../booking";

export default function BookingFilters({
  searchParams,
  setSearchParams,
  activeFilter,
  setActiveFilter,
}) {
  // ← no useSearchParams here anymore

  // const activeFilter = searchParams.get("booking-status") || "all";

  // const [activeFilter, setActiveFilter] = useState("");

  const handleFilterChange = (query) => {
    // const params = new URLSearchParams(searchParams);
    // if (query === "all") {
    //   params.delete("booking-status");
    // } else {
    //   params.set("booking-status", query);
    // }
    // setSearchParams(params);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.query;

        return (
          <button
            key={filter.query}
            type="button"
            onClick={() => setActiveFilter(filter.query)}
            className={`rounded-xl px-6 py-2.5 font-medium transition-colors text-[15px] ${
              isActive
                ? "bg-[#18181b] text-white"
                : "bg-[var(--gray-bg)] text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter.title}
          </button>
        );
      })}
    </div>
  );
}
