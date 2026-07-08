import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  active: "#0084AA",
  completed: "#13A575",
  grid: "#eef0f2",
  axis: "#9aa1a9",
};

// Fallback sample data, only used if no data prop is passed in
const sampleData = [
  { month: "Jan", monthNumber: 1, activeBookings: 0, completedBookings: 0 },
  { month: "Feb", monthNumber: 2, activeBookings: 0, completedBookings: 0 },
  { month: "Mar", monthNumber: 3, activeBookings: 0, completedBookings: 0 },
  { month: "Apr", monthNumber: 4, activeBookings: 0, completedBookings: 0 },
  { month: "May", monthNumber: 5, activeBookings: 0, completedBookings: 0 },
  { month: "Jun", monthNumber: 6, activeBookings: 15, completedBookings: 3 },
  { month: "Jul", monthNumber: 7, activeBookings: 0, completedBookings: 0 },
  { month: "Aug", monthNumber: 8, activeBookings: 0, completedBookings: 0 },
  { month: "Sep", monthNumber: 9, activeBookings: 0, completedBookings: 0 },
  { month: "Oct", monthNumber: 10, activeBookings: 0, completedBookings: 0 },
  { month: "Nov", monthNumber: 11, activeBookings: 0, completedBookings: 0 },
  { month: "Dec", monthNumber: 12, activeBookings: 0, completedBookings: 0 },
];

function formatTick(value) {
  if (value >= 1000) return `${value / 1000}K`;
  return `${value}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const activeVal =
    payload.find((p) => p.dataKey === "activeBookings")?.value ?? 0;
  const completedVal =
    payload.find((p) => p.dataKey === "completedBookings")?.value ?? 0;
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "8px 12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontSize: 12,
        minWidth: 90,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color: "#1f2937" }}>
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: COLORS.active,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 2,
            background: COLORS.active,
            display: "inline-block",
          }}
        />
        {activeVal.toLocaleString()}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#0f9d64",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 2,
            background: COLORS.completed,
            display: "inline-block",
          }}
        />
        {completedVal.toLocaleString()}
      </div>
    </div>
  );
}

function LegendSwatch({ label, bgColor }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 14,
        color: "#4b5563",
        fontWeight: 600,
      }}
    >
      <span
        className="inline-block rounded-[4px] w-[14px] h-[14px]"
        style={{ background: bgColor }}
      />
      {label}
    </span>
  );
}

export default function BookingsChart({
  data = [],
  startDate,
  endDate,
  onDateChange,
  onReset,
}) {
  const chartData = [...data].sort((a, b) => a.monthNumber - b.monthNumber);

  return (
    <div className="w-full rounded-[16px] p-5 mx-auto mt-8 bg-white">
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <h2 className="text-[23px] font-semibold leading-none">Bookings</h2>
        <div className="">
          <div className="flex items-center flex-wrap gap-3">
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  onDateChange("bookingStartDate", e.target.value)
                }
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>

            <div className="relative">
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => onDateChange("bookingEndDate", e.target.value)}
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>
            {(startDate || endDate) && (
              <button
                onClick={onReset}
                className="px-4 py-2 text-xs font-medium text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full border border-[#E5E5EF] my-3" />

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <LegendSwatch label="Active Bookings" bgColor={COLORS.active} />
        <LegendSwatch label="Completed Bookings" bgColor={COLORS.completed} />
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 8, left: -8, bottom: 0 }}
            barGap={0}
          >
            <CartesianGrid
              vertical={false}
              stroke={COLORS.grid}
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: COLORS.axis }}
            />
            <YAxis
              allowDecimals={false}
              tickFormatter={formatTick}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: COLORS.axis }}
              width={32}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
            />
            <Bar
              dataKey="completedBookings"
              stackId="a"
              fill={COLORS.completed}
              radius={[0, 0, 4, 4]}
              maxBarSize={28}
            />
            <Bar
              dataKey="activeBookings"
              stackId="a"
              fill={COLORS.active}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
