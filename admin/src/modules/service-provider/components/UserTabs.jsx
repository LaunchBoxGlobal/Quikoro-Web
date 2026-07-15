import { useSearchParams } from "react-router-dom";

const UserTabs = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "basic";

  const handleTabChange = (tab) => {
    const params = new URLSearchParams(searchParams);

    params.set("tab", tab); // preserves all other params

    setSearchParams(params);
  };

  return (
    <div className="inline-flex bg-white p-2 rounded-[16px] mb-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 border-b overflow-x-auto w-full sm:w-auto min-w-[250px]">
      <button
        onClick={() => handleTabChange("basic")}
        className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${
          activeTab === "basic"
            ? "gradient-bg text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        Basic Info
      </button>

      {user?.role === "PROVIDER" && (
        <button
          onClick={() => handleTabChange("id")}
          className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${
            activeTab === "id"
              ? "gradient-bg text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          ID Cards
        </button>
      )}

      {user?.accountStatus !== "PENDING" && user?.role === "PROVIDER" && (
        <button
          onClick={() => handleTabChange("services")}
          className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${
            activeTab === "services"
              ? "gradient-bg text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Services
        </button>
      )}

      {user?.accountStatus !== "PENDING" && (
        <button
          onClick={() => handleTabChange("bookings")}
          className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${
            activeTab === "bookings"
              ? "gradient-bg text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Bookings
        </button>
      )}
    </div>
  );
};

export default UserTabs;
