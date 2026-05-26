import SettingsSidebar from "../features/settings/components/SettingsSidebar";

export default function SettingsLayout({ activeTab, setActiveTab, children }) {
  return (
    <div className="rounded-[2.5rem] foreground overflow-hidden w-full flex-1 flex flex-col">
      {/* HEADER */}
      <div className="px-5 lg:px-8 pt-8 pb-8">
        <h1 className="text-[36px] font-bold tracking-tight text-gray-900 mb-2">
          Settings
        </h1>

        <p className="text-[18px] text-gray-500 font-medium">
          Manage your account and preference
        </p>
      </div>

      <hr className="border-gray-200 border-t-[1.5px]" />

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row flex-1">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 px-8 lg:px-8 py-10 foreground">{children}</div>
      </div>
    </div>
  );
}
