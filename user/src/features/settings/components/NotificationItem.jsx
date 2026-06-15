export default function NotificationItem({ notif, toggleNotification }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-5">
        <span className="text-[17px] font-medium text-black">
          {notif.title}
        </span>

        <button
          onClick={() => toggleNotification(notif.id)}
          className={`relative w-[52px] h-[28px] rounded-full transition-colors flex items-center shrink-0 ${
            notif.enabled ? "bg-black" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute left-[3px] bg-white w-[22px] h-[22px] rounded-full transition-transform duration-300 ease-in-out ${
              notif.enabled ? "translate-x-[24px]" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <hr className="border-gray-200" />
    </div>
  );
}
