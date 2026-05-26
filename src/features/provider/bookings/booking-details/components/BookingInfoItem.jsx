export default function BookingInfoItem({ label, value }) {
  return (
    <div>
      <div className="mb-1.5 text-[13px] text-gray-400">{label}</div>

      <div className="text-[15px] font-medium text-gray-900 leading-snug">
        {value}
      </div>
    </div>
  );
}
