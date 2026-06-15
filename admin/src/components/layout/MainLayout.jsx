import { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import useInternetStatus from "../../hooks/useInternetStatus";
import NoInternet from "./NoInternet";

const MainLayout = ({ pages }) => {
  const sidebarRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const isOnline = useInternetStatus();
  const admin = Cookies.get("adminData")
    ? JSON.parse(Cookies.get("adminData"))
    : null;

  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  if (!isOnline) return <NoInternet />;

  return (
    <div className="w-screen h-screen flex justify-start items-start bg-transparent relative overflow-hidden body-image">
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[60%] z-[1000] lg:z-auto py-5 pl-5 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start h-full`}
        >
          <Sidebar />
        </div>
      </div>

      <div className="w-full relative z-10 lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)] h-full overflow-y-auto overflow-x-hidden p-5">
        <div className="sticky top-0 left-0 w-full h-[94px] bg-white custom-shadow flex items-center justify-between lg:justify-end px-4 z-30 rounded-[16px] lg:rounded-[24px]">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>

          <div className="flex gap-3 items-center py-4 font-normal text-gray-900">
            <p className="font-semibold text-gray-700 leading-tight">
              {admin?.fullName || "Admin"}
            </p>
            <div className="h-[54px] min-w-[54px] max-w-[54px] rounded-full">
              <img
                className="h-full w-full rounded-full object-cover"
                src={"/admin-profile-image.png"}
                alt="admin-profile-image"
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-[16px] lg:rounded-[32px] p-6 mt-6 text-black custom-shadow z-50 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
