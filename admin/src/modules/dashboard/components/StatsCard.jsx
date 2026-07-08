import React from "react";

const StatsCard = ({ title, count }) => {
  return (
    <div className="bg-white w-full rounded-[20px] p-5">
      <h2 className="font-medium text-[#565656] leading-none">{title}</h2>
      <div className="w-full flex items-center justify-between gap-4 mt-3">
        <span className="inline-block text-[24px] font-semibold">{count}</span>
        <span className="inline-block"></span>
      </div>
    </div>
  );
};

export default StatsCard;
