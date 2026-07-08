import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  users: "#0084AA",
  providers: "#C31736",
  grid: "#eef0f2",
  axis: "#9aa1a9",
  card: "#ffffff",
};

function formatTick(value) {
  if (value === 0) return "0";
  if (value >= 1000) return `${value / 1000}K`;
  return value;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="w-full bg-white border border-[#e5e7eb] rounded-[8px] px-[12px] py-[8px] text-xs"
      style={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color: "#1f2937" }}>
        {label}
      </div>

      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          style={{ color: entry.color, display: "flex", gap: 6 }}
        >
          <span>
            {entry.dataKey === "users" ? "Users" : "Service Providers"}:
          </span>
          <span style={{ fontWeight: 600 }}>
            {Number(entry.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// Renders a floating pill label above a specific highlighted point on the line
function HighlightDot(props) {
  const { cx, cy, value, color } = props;

  if (!value) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  }

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#fff"
        stroke={color}
        strokeWidth={2}
      />

      <g transform={`translate(${cx}, ${cy - 34})`}>
        <rect x={-18} y={-13} width={36} height={24} rx={12} fill={color} />

        <text
          x={0}
          y={4}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill="#fff"
        >
          {value}
        </text>
      </g>
    </g>
  );
}

function LegendDot({ label, bgColor }) {
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

export default function RegistrationStats({
  data = [],
  startDate,
  endDate,
  onDateChange,
  onReset,
}) {
  // Prepare API data for chart
  const chartData = data.map((item) => {
    let highlight = null;
    let label = "";

    if (item.users > 0 || item.providers > 0) {
      if (item.users >= item.providers) {
        highlight = "users";
        label = item.users;
      } else {
        highlight = "providers";
        label = item.providers;
      }
    }

    return {
      ...item,
      highlight,
      label,
    };
  });

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
        <h2 className="text-[23px] font-semibold leading-none">
          Registration Stats
        </h2>

        <div className="">
          <div className="flex items-center flex-wrap gap-3">
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  onDateChange("registrationStartDate", e.target.value)
                }
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 text-xs outline-none"
              />
            </div>

            <div className="relative">
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) =>
                  onDateChange("registrationEndDate", e.target.value)
                }
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
        <LegendDot label="Users" bgColor="#0084AA" />
        <LegendDot label="Service Providers" bgColor="#13A575" />
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 40, right: 8, left: -8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke={COLORS.grid} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: COLORS.axis }}
              interval="preserveStartEnd"
            />

            <YAxis
              tickFormatter={formatTick}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: COLORS.axis }}
              width={36}
              allowDecimals={false}
              domain={[0, (max) => Math.max(max + 5, 10)]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="users"
              stroke={COLORS.users}
              strokeWidth={2.5}
              connectNulls
              dot={(props) => (
                <HighlightDot
                  key={`u-${props.payload.month}`}
                  {...props}
                  dataKey="users"
                  color={COLORS.users}
                />
              )}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="providers"
              stroke={COLORS.providers}
              strokeWidth={2.5}
              connectNulls
              dot={(props) => (
                <HighlightDot
                  key={`p-${props.payload.month}`}
                  {...props}
                  dataKey="providers"
                  color={COLORS.providers}
                />
              )}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
