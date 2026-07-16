import { useState } from "react";
import { filters } from "../booking";

export default function BookingFilters({
  searchParams,
  setSearchParams,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="mb-8 flex gap-3 overflow-x-auto whitespace-nowrap lg:flex-wrap lg:overflow-visible hidden-scrollbar">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.query;

        return (
          <button
            key={filter.query}
            type="button"
            onClick={() => setActiveFilter(filter.query)}
            className={`shrink-0 rounded-xl px-6 py-2.5 font-medium transition-colors text-[15px] ${
              isActive
                ? "gradient-bg text-white"
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
