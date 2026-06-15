import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/export";

const AppLogo = () => {
  return (
    <Link to={"/"}>
      <img
        src={Logo}
        alt="finance tracking app logo"
        width={395}
        height={76}
        className="w-[210px] md:w-[225px] lg:w-[275px] xl:w-[395px]"
      />
    </Link>
  );
};

export default AppLogo;
