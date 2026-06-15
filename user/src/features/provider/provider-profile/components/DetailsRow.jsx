export default function DetailsRow({ label, value }) {
  return (
    <div>
      <hr className="border-gray-100" />

      <div className="py-5">
        <div className="mb-1.5 text-[13px] text-gray-500">{label}</div>
        <div className="text-[15px] font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );
}
