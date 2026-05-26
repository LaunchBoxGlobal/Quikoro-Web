import React from "react";
import { Link, useLocation } from "react-router-dom";
import { nav_links } from "./NavLinks";

const NavLinkItem = ({ item }) => {
  const location = useLocation();
  const isActive =
    item.url === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.url);
  return (
    <Link
      to={item?.url}
      className={`relative font-medium 
        ${isActive ? "text-black" : "text-gray-500"}
        after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:h-[2px] after:bg-[var(--primary)] after:rounded-md after:transition-all
        ${isActive ? "after:w-[60%]" : "after:w-0"}
      `}
    >
      {item?.title}
    </Link>
  );
};

export default NavLinkItem;
