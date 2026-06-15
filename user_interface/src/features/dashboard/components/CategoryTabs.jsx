import { useEffect, useState } from "react";
import { Wrench, Zap, Paintbrush, Hammer, Sparkles } from "lucide-react";
import { CATEGORY_OPTIONS } from "../../../utils/categories";
import { useGetCategoriesQuery } from "../../../services/categoryApi/categoryApi";

const CategoryTabs = ({ activeTab, setActiveTab }) => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const categories = data?.data;

  // useEffect(() => {
  //   if (categories && categories?.length > 0) {
  //     setActiveTab(categories[0].name);
  //   }
  // }, [data]);

  if (!categories || categories?.length === 0) return;

  return (
    <div className="flex overflow-x-auto gap-3 hidden-scrollbar px-5 pb-10">
      <button
        onClick={() => setActiveTab("ALL")}
        className={`flex items-center gap-2 px-6 py-3.5 rounded-xl whitespace-nowrap text-[15px] font-medium transition-colors border  ${
          activeTab === "ALL"
            ? "bg-[#18181b] text-white border-[#18181b]"
            : "bg-[var(--gray-bg)] text-gray-700 border-white hover:bg-gray-50 hover:border-gray-100"
        }`}
      >
        All
      </button>
      {categories?.map((tab) => {
        const isActive = activeTab === tab?.name;
        // const isActive = false;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab?.name)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl whitespace-nowrap text-[15px] font-medium transition-colors border  ${
              isActive
                ? "bg-[#18181b] text-white border-[#18181b]"
                : "bg-[var(--gray-bg)] text-gray-700 border-white hover:bg-gray-50 hover:border-gray-100"
            }`}
          >
            {tab?.name}
          </button>
        );
      })}

      <style>{`
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryTabs;
