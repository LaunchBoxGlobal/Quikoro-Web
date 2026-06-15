import { ChevronDown } from "lucide-react";

export default function FormSelect({ label }) {
  return (
    <div>
      <label className="mb-3 block text-[15px] font-medium text-gray-900">
        {label}
      </label>

      <div className="relative">
        <select className="w-full appearance-none rounded-xl bg-[#f4f4f5] px-4 py-4 text-[15px] text-gray-500 outline-none">
          <option value="">Select</option>
        </select>

        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    </div>
  );
}
