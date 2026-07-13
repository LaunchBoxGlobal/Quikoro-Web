import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img
        src="/logo.png"
        alt="quikoro logo"
        width={203}
        height={57}
        className="w-[140px] lg:w-[180px]"
      />
    </Link>
  );
};

export default Logo;
