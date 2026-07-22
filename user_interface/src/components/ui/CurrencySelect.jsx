import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const CurrencySelect = ({
  label,
  value,
  onBlur,
  onChange,
  options = [],
  placeholder = "Select speciality",
  error,
  bgColor = "#F5F5F5",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlight, setHighlight] = useState(0);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options?.filter((opt) =>
    opt.label?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (option) => {
    onChange(option);

    if (onBlur) {
      onBlur();
    }

    setOpen(false);
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      setHighlight((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    }

    if (e.key === "ArrowUp") {
      setHighlight((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter" && filtered[highlight]) {
      e.preventDefault();
      handleSelect(filtered[highlight]);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-semibold leading-none">{label}</label>
      )}
      <div
        ref={wrapperRef}
        className="relative w-full"
        onKeyDown={handleKeyDown}
      >
        {/* input trigger */}
        <div
          onClick={() => {
            setOpen((prev) => !prev);
            setHighlight(0);

            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className={`w-full h-[49px] rounded-[12px] px-4 flex items-center justify-between cursor-pointer focus-within:outline focus-within:outline-[var(--primary)] ${error ? "border border-red-500" : ""}`}
          style={{
            background: bgColor,
          }}
        >
          <span
            className={`text-sm ${value ? "text-black" : "text-[var(--secondary)]"}`}
          >
            {value?.label || placeholder}
          </span>

          <span className="text-gray-400">
            <IoMdArrowDropdown
              size={26}
              className={`transition-all duration-200 ${open ? `rotate-180` : `rotate-0`}`}
            />
          </span>
        </div>

        {/* dropdown */}
        {open && (
          <div className="absolute z-50 mt-2 w-full bg-[#F5F5F5] rounded-xl shadow-lg border max-h-60 overflow-auto">
            {/* search */}
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlight(0);
              }}
              placeholder="Search..."
              className="w-full px-3 py-2 border-b outline-none text-sm"
            />

            {/* options */}
            {filtered.length === 0 ? (
              <p className="p-3 text-sm text-gray-400">No results</p>
            ) : (
              filtered.map((opt, index) => (
                <div
                  key={opt.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt);
                  }}
                  className={`px-4 py-2 cursor-pointer text-xs ${
                    index === highlight ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencySelect;
