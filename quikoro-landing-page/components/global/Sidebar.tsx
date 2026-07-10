import { HiOutlineX } from "react-icons/hi";

interface SidebarProps {
  open: boolean;
  NAV_LINKS: string[];
  closeSidebar: () => void;
  scrollToSection: (id: string) => void;
}

const Sidebar = ({
  open,
  closeSidebar,
  NAV_LINKS,
  scrollToSection,
}: SidebarProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        open
          ? "visible bg-black/60 opacity-100"
          : "invisible bg-black/0 opacity-0"
      }`}
    >
      {/* Click Outside */}
      <div className="absolute inset-0" onClick={closeSidebar} />

      {/* Sidebar */}
      <aside
        className={`absolute right-0 top-0 h-full w-[70%] bg-white shadow-xl transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <button onClick={closeSidebar}>
            <HiOutlineX className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start w-full p-6">
          {NAV_LINKS.map((item) => (
            <button
              type="button"
              onClick={() => {
                scrollToSection(item);
                closeSidebar();
              }}
              className="border-b w-full text-start py-4 text-base font-medium text-gray-800"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Bottom Buttons */}
        <div className="space-y-4 px-6 pt-4">
          <button
            type="button"
            onClick={closeSidebar}
            className="block w-full text-center text-lg font-medium text-[#003544]"
          >
            Login
          </button>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-12 items-center justify-center rounded-full gradient-bg font-semibold text-white w-full"
          >
            Download App
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
