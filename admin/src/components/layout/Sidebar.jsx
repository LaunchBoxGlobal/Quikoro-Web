import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { SIDEBAR_LINKS } from "../../constants/sidebar";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLink = (link, name) => {
    navigate(link);
  };

  const handleLogout = async () => {
    Cookies.remove("adminToken");
    Cookies.remove("adminData");
    navigate("/login");
  };
  return (
    <div className="w-full h-full rounded-[10px] py-6 px-5 flex flex-col items-start gap-y-6 bg-white custom-shadow">
      <div className="w-full">
        <img
          src="/quikoro-logo.png"
          alt="quikoro logo"
          className="max-w-[198px] object-contain"
        />
      </div>
      <ul className="w-full flex flex-col gap-y-1 mt-3">
        {SIDEBAR_LINKS?.map((link, index) => {
          return (
            <li className={`w-full text-black h-[48px]`} key={index}>
              <Link
                to={link?.page}
                onClick={() => navigateToLink(link?.page, link?.title)}
                className={`group text-sm flex items-center gap-x-2.5 font-medium w-full h-[48px] px-4 rounded-[12px] outline-none transition-all duration-300 ${
                  location?.pathname === link?.page ||
                  location?.pathname.startsWith(link?.page + "/")
                    ? "gradient-bg text-white"
                    : "bg-transparent text-black hover:bg-gradient-to-l from-[#0084AA] to-[#003544] hover:text-white"
                }`}
              >
                <div className="min-w-5">
                  <img
                    src={link?.icon}
                    alt={link?.iconAltTag}
                    width={link?.iconWidth}
                    height={link?.iconHeight}
                    className={`w-auto h-5 transition-all duration-300 will-change-transform group-hover:brightness-0 group-hover:invert ${
                      location?.pathname === link?.page ||
                      location?.pathname.startsWith(link?.page + "/")
                        ? "brightness-0 invert"
                        : ""
                    }`}
                  />
                </div>

                <span className="transition-colors duration-300">
                  {link?.title}
                </span>
              </Link>
            </li>
          );
        })}

        <button
          type="button"
          onClick={() => handleLogout()}
          className={`text-sm flex items-center gap-x-2.5 font-medium w-full h-[49px] px-4 rounded-[12px] outline-none 
                    bg-transparent text-black hover:bg-gradient-to-l from-[#0084AA] to-[#003544] hover:text-white transition-all duration-300 group"
                }`}
        >
          <div className="min-w-6">
            <FiLogOut className="text-lg transition-all duration-300 text-[#015870] group-hover:text-white" />
          </div>
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
