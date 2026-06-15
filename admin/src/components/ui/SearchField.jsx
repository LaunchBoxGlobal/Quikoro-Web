import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchField = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) params.set("search", value.trim());
      else params.delete("search");

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <div className="w-full md:max-w-[252px] h-[44px] bg-white custom-shadow flex items-center justify-between gap-2 px-4 rounded-[12px]">
      <img src="/search-icon.png" alt="search icon" width={18} height={18} />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full outline-none bg-transparent text-sm text-[#565656]"
      />
    </div>
  );
};

export default SearchField;
