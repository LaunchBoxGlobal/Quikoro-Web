export const selectClassName = (error) =>
  `w-full h-[48px] bg-white rounded-[12px] custom-shadow text-sm px-4 border-none
   focus:border-[var(--primary)] placeholder:text-[var(--secondary)]
   outline-none
   ${error ? "border border-red-500" : "border border-transparent"}`;
