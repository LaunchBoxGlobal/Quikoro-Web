export default function FormInput({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-3 block text-[15px] font-medium text-gray-900">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#f4f4f5] px-4 py-4 text-[15px] outline-none placeholder:text-gray-500"
      />
    </div>
  );
}
