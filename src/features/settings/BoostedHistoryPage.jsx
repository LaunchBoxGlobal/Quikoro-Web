import { ImageIcon } from "lucide-react";

export default function BoostedHistoryPage() {
  const boostedHistoryData = [
    {
      id: 1,
      name: "Service Name",
      category: "Plumber",
      date: "Mon, 03 Apr 2026",
      status: "Boosted",
    },
    {
      id: 2,
      name: "Service Name",
      category: "Plumber",
      date: "Mon, 03 Apr 2026",
      status: "Boosted",
    },
    {
      id: 3,
      name: "Service Name",
      category: "Plumber",
      date: "Mon, 03 Apr 2026",
      status: "Boosted",
    },
    {
      id: 4,
      name: "Service Name",
      category: "Plumber",
      date: "Mon, 03 Apr 2026",
      status: "Boosted",
    },
  ];

  return (
    <div>
      <h2 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight mb-5">
        Boosted Services
      </h2>

      <div className="flex flex-col gap-4 md:gap-4 pt-2">
        {boostedHistoryData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center bg-[#ebebeC]">
                <ImageIcon
                  className="text-gray-600"
                  strokeWidth={1}
                  size={24}
                />
              </div>
              <div className="flex flex-col gap-0">
                <div className="text-[15px] font-medium tracking-tight text-black leading-none">
                  {item.name}
                </div>
                <div className="text-[13px] text-gray-500 leading-none my-1">
                  {item.category}
                </div>
                <div className="text-[13px] text-gray-400 leading-none">
                  {item.date}
                </div>
              </div>
            </div>
            <button className="rounded-full bg-[#18181b] px-4 py-2.5 text-[13px] font-medium text-white sm:ml-auto w-max hover:bg-black/90 transition-colors">
              {item.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
