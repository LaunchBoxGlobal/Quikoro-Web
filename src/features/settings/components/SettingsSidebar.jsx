import settingsTabs from "../settingsTabs";

export default function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-full border-b border-gray-200 md:w-[320px] lg:w-[380px] md:border-b-0 md:border-r py-4 md:py-10 overflow-x-auto scrollbar-hide">
      {/* MOBILE HORIZONTAL */}
      <div className="flex md:hidden gap-2 px-4 min-w-max">
        {settingsTabs?.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={`whitespace-nowrap rounded-xl px-5 py-3 text-[15px] font-medium transition-colors ${
              activeTab === item.value
                ? "bg-black text-white"
                : "bg-white text-gray-500"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex flex-col gap-1.5">
        {settingsTabs?.map((item) => (
          <button
            key={item.value}
            className={`text-left text-[17px] py-[13px] pl-6 lg:pl-12 transition-colors relative font-medium ${
              activeTab === item.value
                ? "text-black border-l-4 border-[var(--primary)]"
                : "text-gray-500 hover:text-black border-l-4 border-[#fff]"
            }`}
            onClick={() => setActiveTab(item.value)}
          >
            {activeTab === item && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[26px] bg-black rounded-r-md"></span>
            )}

            {item?.label}
          </button>
        ))}
      </div>
    </div>
  );
}
