import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import NotificationCount from "./NotificationCount";
import Logo from "./Logo";
import { buyerNavLinks, navLinks } from "../../utils/navLinks";
import { MapPin, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import LocationPicker from "./LocationPicker";
import { useUpdateLocationMutation } from "../../services/userService/userApi";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const NAVBAR_LINKS = user?.role === "CUSTOMER" ? buyerNavLinks : navLinks;

  const [openLocationDropdown, setOpenLocationDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAutoPromptedLocation, setHasAutoPromptedLocation] = useState(false);
  const locationRef = useRef(null);

  const [updateLocation, { isLoading: isSavingLocation }] =
    useUpdateLocationMutation();

  const handleToggleDropdown = () => setOpenLocationDropdown((prev) => !prev);

  const handleLocationConfirm = async (payload) => {
    // payload = { latitude, longitude, location }
    try {
      await updateLocation(payload).unwrap();
      setSelectedAddress(payload.location);
      setOpenLocationDropdown(false);
    } catch (err) {
      console.error("Failed to update location:", err);
      // surface this to the user however you handle errors elsewhere, e.g. a toast
    }
  };

  // Keep the displayed address in sync with whatever's actually saved on the
  // profile (covers returning users who already set a location previously).
  useEffect(() => {
    if (user?.location) {
      setSelectedAddress(user.location);
    }
  }, [user?.location]);

  // First time we see a loaded profile with no saved location, open the
  // picker automatically — this is what catches a just-signed-up user.
  // The `hasAutoPromptedLocation` flag means we only ever force this open
  // once per session; if they close it without picking one, we don't keep
  // yanking it back open on every re-render.
  useEffect(() => {
    if (!user || hasAutoPromptedLocation) return;

    if (!user.location) {
      setOpenLocationDropdown(true);
    }
    setHasAutoPromptedLocation(true);
  }, [user, hasAutoPromptedLocation]);

  // Close the dropdown when clicking anywhere outside of it
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

      <div className="relative" ref={locationRef}>
        <button
          type="button"
          onClick={handleToggleDropdown}
          className="flex items-center gap-1 text-sm"
        >
          <MapPin size={15} />
          <span
            className={`font-medium ${
              !user?.location ? "text-orange-500" : ""
            }`}
          >
            {selectedAddress || "Add your location"}
          </span>
        </button>

        {openLocationDropdown && (
          <LocationPicker
            onConfirm={handleLocationConfirm}
            onClose={() => setOpenLocationDropdown(false)}
            submitting={isSavingLocation}
          />
        )}
      </div>

      <div className="flex items-center gap-8">
        {/* NAV LINKS */}
        <nav className="hidden items-center gap-8 md:flex font-medium text-gray-900 text-[15px]">
          {NAVBAR_LINKS?.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative py-2 font-medium transition outline-none${
                  isActive
                    ? `
          bg-gradient-to-l from-[#0084AA] to-[#003544] bg-clip-text text-transparent after:absolute after:bottom-0 after:left-0 after:w-[70%] after:h-[2px] after:bg-gradient-to-l after:from-[#0084AA] after:to-[#003544] after:rounded-full
        `
                    : "text-black hover:opacity-70"
                }`
              }
            >
              {link.title}
            </NavLink>
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
