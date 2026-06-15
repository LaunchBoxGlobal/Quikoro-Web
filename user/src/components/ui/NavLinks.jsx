import React from "react";
import { Link } from "react-router-dom";
import { Logo, ProfilePicture } from "../../assets/export";
import { IoNotifications } from "react-icons/io5";
import AppLogo from "./AppLogo";
import NavLinkItem from "./NavLinkItem";

export const nav_links = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Accounts",
    url: "/accounts",
  },
  {
    title: "Transactions",
    url: "/transactions",
  },
  {
    title: "Reports",
    url: "/reports",
  },
  {
    title: "Budget",
    url: "/budget",
  },
  {
    title: "Goals",
    url: "/goals",
  },
];

const NavLinks = () => {
  return (
    <ul className="hidden lg:flex items-center justify-end gap-8 w-full">
      {nav_links?.map((item) => {
        return (
          <li key={item?.url}>
            <NavLinkItem item={item} />
          </li>
        );
      })}

      <li>
        <button type="button">
          <div className="w-[34px] h-[34px] rounded-full bg-[var(--dark-green)] flex items-center justify-center">
            <IoNotifications className="text-[var(--primary)]" size={20} />
          </div>
        </button>
      </li>

      <li>
        <button type="button">
          <img
            src={ProfilePicture}
            alt="user profile picture"
            width={57}
            height={57}
          />
        </button>
      </li>
    </ul>
  );
};

export default NavLinks;
