import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import NotificationCount from "./NotificationCount";
import Logo from "./Logo";
import { buyerNavLinks, navLinks } from "../../utils/navLinks";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const NAVBAR_LINKS = user?.role === "CUSTOMER" ? buyerNavLinks : navLinks;
  return (
    <header className="flex items-center justify-between pt-6 pb-2">
      {/* LOGO */}
      <Logo />

      <div className="flex items-center gap-8">
        {/* NAV LINKS */}
        <nav className="hidden items-center gap-8 md:flex font-medium text-gray-900 text-[15px]">
          {NAVBAR_LINKS?.map((link) => (
            <Link
              to={link?.path}
              key={link?.path}
              className="font-medium text-black hover:opacity-70 transition outline-none"
            >
              {link?.title}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 lg:gap-6 md:border-l border-gray-200 pl-6">
          {/* NOTIFICATION */}
          <NotificationCount />

          {/* PROFILE DROPDOWN */}
          <ProfileDropdown />

          <button type="button" className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
