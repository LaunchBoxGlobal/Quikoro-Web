import React from "react";

const FilledImageSVG = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="5" fill="#18181b" />
      <circle cx="8.5" cy="8.5" r="2.5" fill="white" />
      <path
        d="M2.5 19.5C4.5 16.5 7.5 13.5 10.5 13.5C13.5 13.5 16 17 18 17C20 17 22.5 14 25 14V25H2.5V19.5Z"
        fill="white"
      />
    </svg>
  );
};

export default FilledImageSVG;
