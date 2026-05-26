import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../assets/export";
import { useSearchParams } from "react-router-dom";

const Search = ({ isLoading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get("q") || "";

  const [value, setValue] = useState(initialValue);
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  return (
    <div className="w-full max-w-[300px] h-[48px] bg-white custom-shadow rounded-[12px] flex items-center gap-2 px-4">
      <img src={SearchIcon} alt="search icon" width={20} height={20} />
      <input
        type="text"
        value={value}
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full h-full outline-none bg-white disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default Search;
