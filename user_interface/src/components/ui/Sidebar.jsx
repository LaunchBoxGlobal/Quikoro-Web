import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import NotificationsDropdown from "./NotificationsDropdown";

export default function Sidebar({ isOpen, onClose, navLinks }) {
  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-full w-[70%] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-6">
          {/* NAV LINKS */}
          <nav className="flex flex-col gap-5 font-medium">
            {navLinks?.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-[#0084AA]"
                      : "text-black hover:text-[#0084AA]"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
