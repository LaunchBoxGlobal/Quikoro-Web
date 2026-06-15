import { ChevronDown } from "lucide-react";

export default function Select({ label, options = [], error, ...props }) {
  return (
    <div>
      <label className="mb-2.5 block text-[15px] font-medium text-black">
        {label}
      </label>

      <div className="relative">
        <select
          {...props}
          className={`
            w-full
            appearance-none
            rounded-[14px]
            px-5
            py-4
            text-[16px]
            outline-none
            bg-[#f8f8f8]
            ${error ? "border border-red-500" : "border border-transparent"}
          `}
        >
          <option value="">Select</option>

          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
          "
          size={24}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
