export default function AvailableDays() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const selectedDays = ["Mon", "Tue", "Wed"];

  return (
    <div>
      <label className="mb-3 block text-[15px] font-medium text-gray-900">
        Available Days
      </label>

      <div className="flex gap-2">
        {days.map((day) => (
          <button
            key={day}
            className={`flex-1 rounded-lg py-3 text-[14px] font-medium transition-colors ${
              selectedDays.includes(day)
                ? "bg-[#18181b] text-white"
                : "bg-[#f4f4f5] text-gray-500 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
