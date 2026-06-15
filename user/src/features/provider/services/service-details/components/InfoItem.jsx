export default function InfoItem({ label, value }) {
  return (
    <div>
      <div className="mb-1.5 text-[14px] text-gray-500">{label}</div>

      <div className="text-[14px] font-medium text-gray-900">{value}</div>
    </div>
  );
}
