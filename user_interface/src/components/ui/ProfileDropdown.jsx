import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import removeToken from "../../utils/removeToken";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../services/userService/userSlice";
import { useLogoutUserMutation } from "../../services/authApi/authApi";
import { enqueueSnackbar } from "notistack";
import { socket } from "../../socket";

const profileLinks = [
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Settings",
    path: "/settings",
  },
  {
    title: "Terms and condition",
    path: "/settings?tab=terms-and-condition",
  },
  {
    title: "Privacy Policy",
    path: "/settings?tab=privacy-policy",
  },
];

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    const fcmToken = localStorage.getItem("quikoroFcmToken");
    try {
      if (socket.connected) {
        socket.disconnect();
      }
      await logoutUser({
        fcmToken,
      }).unwrap();
      removeToken();
      dispatch(clearUser());
      localStorage.clear("quikoroFcmToken");
      localStorage.clear("quikoroBrowserDeviceId");

      navigate("/login");
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong.",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
      console.log("LOGOUT ERROR >>> ", error);
    } finally {
      removeToken();
      dispatch(clearUser());
      navigate("/login");
    }
  };

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // CLOSE DROPDOWN ON ROUTE CHANGE
  useEffect(() => {
    setOpenDropdown(false);
  }, [location.pathname]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* PROFILE BUTTON */}
      <button
        type="button"
        onClick={() => setOpenDropdown((prev) => !prev)}
        className="h-[37px] w-[37px] lg:h-[57px] lg:w-[57px] overflow-hidden rounded-full bg-gray-900 ring-2 ring-white cursor-pointer"
      >
        <img
          src={
            user && user?.profilePicture
              ? user?.profilePicture
              : "/user-profile-placeholder.png"
          }
          alt="User avatar"
          className="h-full w-full object-cover rounded-full"
        />
      </button>

      {/* DROPDOWN */}
      {openDropdown && (
        <div className="absolute right-0 top-[40px] lg:top-[72px] w-[240px] rounded-[20px] bg-[#fff] custom-shadow overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          {/* LINKS */}
          {profileLinks.map((item, index) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpenDropdown(false);
              }}
              className={`w-full text-left px-5 ${index === 0 ? "pb-2 pt-4" : "py-3"} text-[16px] text-black hover:bg-[var(--gray-bg)] transition ${
                index !== profileLinks.length - 1
                  ? "border-b border-[#dddddd]"
                  : ""
              }`}
            >
              {item.title}
            </button>
          ))}

          {/* LOGOUT */}
          <button
            onClick={() => handleLogout()}
            className="w-full text-left px-5 pt-2.5 pb-4 text-[17px] text-black hover:bg-[#ebebeb] transition border-t border-[#dddddd]"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
