import React from "react";
import { BiError } from "react-icons/bi";

const Error = ({ error = "Something went wrong. Try again." }) => {
  return (
    <div className="w-full text-center flex items-center justify-center gap-1.5 h-[40vh]">
      <BiError size={20} className="secondary-text" />
      <p className="secondary-text text-base font-medium">{error}</p>
    </div>
  );
};

export default Error;
