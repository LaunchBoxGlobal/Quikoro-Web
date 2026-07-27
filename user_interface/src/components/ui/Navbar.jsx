import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import Logo from "./Logo";
import { buyerNavLinks, navLinks } from "../../utils/navLinks";
import { Bell, MapPin, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import LocationPicker from "./LocationPicker";
import { useUpdateLocationMutation } from "../../services/userService/userApi";
import NotificationsDropdown from "./NotificationsDropdown";
import Sidebar from "./Sidebar";
import LocationButton from "./LocationButton";
import { FaLocationDot } from "react-icons/fa6";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const NAVBAR_LINKS = user?.role === "CUSTOMER" ? buyerNavLinks : navLinks;

  const [openLocationDropdown, setOpenLocationDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAutoPromptedLocation, setHasAutoPromptedLocation] = useState(false);
  const locationRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [updateLocation, { isLoading: isSavingLocation }] =
    useUpdateLocationMutation();

  const handleToggleDropdown = () => setOpenLocationDropdown((prev) => !prev);

  const handleLocationConfirm = async (payload) => {
    try {
      await updateLocation(payload).unwrap();
      setSelectedAddress(payload.location);
      setOpenLocationDropdown(false);
    } catch (err) {
      console.error("Failed to update location:", err);
    }
  };

  useEffect(() => {
    if (user?.location) {
      setSelectedAddress(user.location);
    }
  }, [user?.location]);

  useEffect(() => {
    if (!user || hasAutoPromptedLocation) return;

    if (!user.location) {
      setOpenLocationDropdown(true);
    }

    setHasAutoPromptedLocation(true);
  }, [user, hasAutoPromptedLocation]);

  useEffect(() => {
    if (!openLocationDropdown) return;

    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setOpenLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openLocationDropdown]);

  return (
    <header className="flex items-center justify-between pt-6 pb-2">
      {/* LOGO */}
      <Logo />

      {/* LOCATION */}
      {/* <LocationButton
        user={user}
        handleToggleDropdown={handleToggleDropdown}
        locationRef={locationRef}
        selectedAddress={selectedAddress}
        openLocationDropdown={openLocationDropdown}
        setOpenLocationDropdown={setOpenLocationDropdown}
        handleLocationConfirm={handleLocationConfirm}
        isSavingLocation={isSavingLocation}
      /> */}

      <div className="flex items-center gap-8">
        {/* NAV LINKS */}
        <nav className="hidden items-center gap-8 lg:flex font-medium text-gray-900 text-[15px]">
          {NAVBAR_LINKS?.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative py-2 font-medium transition outline-none ${isActive ? `bg-gradient-to-l from-[#0084AA] to-[#003544] bg-clip-text text-transparent after:absolute after:bottom-0 after:left-0 after:w-[70%] after:h-[2px] after:bg-gradient-to-l after:from-[#0084AA] after:to-[#003544] after:rounded-full` : "text-black hover:opacity-70"}`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 lg:gap-6 md:border-l border-gray-200 pl-6">
          <button
            type="button"
            onClick={() => handleToggleDropdown()}
            className="relative -top-1 md:hidden"
          >
            <FaLocationDot size={20} className="text-[#0084AA]" />
          </button>

          {openLocationDropdown && (
            <div className="absolute inset-x-0 z-50 md:hidden">
              <div className="w-full">
                <LocationPicker
                  onConfirm={handleLocationConfirm}
                  onClose={() => setOpenLocationDropdown(false)}
                  submitting={isSavingLocation}
                />
              </div>
            </div>
          )}

          <NotificationsDropdown />

          <ProfileDropdown />

          {/* MOBILE MENU */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navLinks={NAVBAR_LINKS}
      />
    </header>
  );
}
