import { Zap, CheckCircle, Check } from "lucide-react";

import PlanFeatures from "./PlanFeatures";

export default function PlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(plan.id)}
      className={`relative rounded-[2rem] p-8 text-left transition-all ${
        isSelected
          ? "bg-[#f4f4f5] ring-[2.5px] ring-[#18181b] shadow-sm"
          : "bg-[#f4f4f5] hover:bg-gray-200/50"
      }`}
    >
      {/* Selected Icon */}
      {isSelected && (
        <div className="absolute right-6 top-6 text-[#fff] rounded-full bg-black w-6 h-6 flex items-center justify-center">
          {/* <CheckCircle size={24} fill="currentColor" color="white" /> */}
          <Check size={17} />
        </div>
      )}

      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#3f3f46] px-4 py-1.5 text-[12px] font-medium text-white shadow-sm">
          Most Popular
        </div>
      )}

      {/* Top */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-sm text-gray-700">
          <Zap size={24} strokeWidth={1.5} />
        </div>

        <div className="text-[19px] font-medium text-gray-900">{plan.name}</div>
      </div>

      {/* Price */}
      <div className="mb-8 flex items-baseline gap-1.5">
        <span className="text-[32px] font-semibold tracking-tight text-gray-900">
          {plan.price}
        </span>

        <span className="text-[14px] font-medium text-gray-400">
          {plan.duration}
        </span>
      </div>

      {/* Features */}
      <PlanFeatures features={plan.features} />
    </button>
  );
}
