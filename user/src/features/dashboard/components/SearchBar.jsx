import { useEffect, useRef, useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { DropdownIcon } from "../../../assets/export";
import { TiArrowSortedDown } from "react-icons/ti";

const locations = ["New York, USA", "Los Angeles, USA", "Chicago, USA"];

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state
  const [location, setLocation] = useState(
    searchParams.get("location") || "New York, USA",
  );

  const [service, setService] = useState(searchParams.get("service") || "");

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Sync state with URL changes
  useEffect(() => {
    setLocation(searchParams.get("location") || "New York, USA");

    setService(searchParams.get("service") || "");
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search handler
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location);
    }

    if (service.trim()) {
      params.set("service", service);
    }

    setSearchParams(params);
  };

  const handleRemoveFilters = () => {
    // Clear URL params
    setSearchParams({});

    // Reset local state
    setLocation("New York, USA");
    setService("");

    // Optional: close dropdown
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full max-w-[840px] glass-card rounded-[12px] p-2.5 shadow-sm gap-2 md:gap-0">
      {/* Location Dropdown */}
      <div ref={dropdownRef} className="relative w-full md:w-[234px]">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center px-3 py-3 md:pr-3 glass rounded-[12px] cursor-pointer"
        >
          <div className="w-full flex items-center gap-2">
            <MapPin className="text-gray-100 shrink-0" size={20} />

            <span className="text-[14px] text-gray-100 font-semibold truncate">
              {location}
            </span>
          </div>

          <TiArrowSortedDown
            className={`text-gray-100 text-2xl transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-100 rounded-[12px] shadow-lg z-50 overflow-hidden">
            {locations.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setLocation(item);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                  location === item
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Service Input */}
      <div className="flex items-center w-full flex-1 px-3 py-3 md:py-3 md:pl-4 md:ml-3 glass rounded-[12px]">
        <Search className="text-gray-100 mr-3 shrink-0" size={20} />

        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="What service do you need?"
          className="w-full bg-transparent outline-none text-[16px] placeholder:text-gray-100 text-gray-100"
        />

        {service && (
          <button
            type="button"
            onClick={handleRemoveFilters}
            className="min-w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <X size={14} className="text-gray-700 relative left-[0.5px]" />
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        className="w-full md:w-auto bg-white h-[51px] px-5 rounded-[14px] font-semibold shrink-0 mt-2 md:mt-0 md:ml-3 z-40 relative"
      >
        Find a Service
      </button>
    </div>
  );
};

export default SearchBar;
