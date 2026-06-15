import React from "react";

const Button = ({
  type = "button",
  text,
  onclick,
  isLoading = false,
  loader = "Loading...",
}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      disabled={isLoading}
      className={`primary-button disabled:cursor-progress`}
    >
      {isLoading ? loader : text}
    </button>
  );
};

export default Button;
