export default function Input({ label, placeholder }) {
  return (
    <div>
      <label className="mb-2.5 block text-[15px] font-medium text-black">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-[14px] bg-[#f8f8f8] px-5 py-4 text-[16px] outline-none placeholder:text-gray-400"
      />
    </div>
  );
}
