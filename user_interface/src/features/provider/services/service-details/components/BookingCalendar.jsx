import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BookingCalendar = ({
  availableDays = [],
  value,
  onChange,
  error,
  touched,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isAvailable = (date) => {
    if (date < today) return false;
    const dayName = DAY_NAMES[date.getDay()];
    return availableDays.includes(dayName);
  };

  const handleSelect = (day) => {
    const date = new Date(year, month, day);
    if (!isAvailable(date)) return;

    // Build YYYY-MM-DD from local date parts instead of using toISOString() (which converts to UTC)
    const formatted = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    onChange(formatted);
    setIsOpen(false);
  };

  const selectedDate = value ? new Date(value + "T00:00:00") : null;

  const formatDisplay = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day) => {
    const d = new Date(year, month, day);
    return d.toDateString() === today.toDateString();
  };

  const canGoPrev = year > today.getFullYear() || month > today.getMonth();

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full">
      <p className="text-sm font-semibold mb-1.5">Date</p>

      {/* Trigger input */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`w-full h-[48px] bg-white rounded-[12px] px-4 flex items-center justify-between text-sm transition-all border ${
          touched && error
            ? "border-red-400"
            : "border-transparent focus:border-[var(--primary)]"
        }`}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value ? formatDisplay(value) : "Select a date"}
        </span>
        <Calendar size={16} className="text-gray-400 shrink-0" />
      </button>

      {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* Calendar modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar card */}
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-xl z-10 animate-scaleIn">
            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>

            <p className="text-sm font-semibold text-gray-800 mb-4">
              Select a Date
            </p>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className={`p-1 rounded-lg transition-colors ${
                  canGoPrev
                    ? "hover:bg-gray-100 text-gray-700"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm font-semibold text-gray-800">
                {MONTH_NAMES[month]} {year}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="text-center text-[11px] font-semibold text-gray-400 py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} />;

                const date = new Date(year, month, day);
                const available = isAvailable(date);
                const selected = isSelected(day);
                const todayMark = isToday(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelect(day)}
                    disabled={!available}
                    className={`
                      relative h-9 w-full flex items-center justify-center rounded-lg text-sm font-medium transition-all
                      ${
                        selected
                          ? "bg-[var(--primary)] text-white shadow-md"
                          : available
                            ? "hover:bg-[var(--primary)]/10 text-gray-800 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                      }
                    `}
                  >
                    {day}
                    {todayMark && !selected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--primary)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                <span className="text-[11px] text-gray-500">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="text-[11px] text-gray-500">Unavailable</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
