import React from "react";

const OutlinedButton = ({ type = "button", text, onclick }) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className="w-full h-[48px] text-black rounded-[12px] font-medium border-2 px-6 border-[var(--primary)] shadow-sm hover:bg-[var(--primary)] transition-all duration-300 text-sm lg:text-base"
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
