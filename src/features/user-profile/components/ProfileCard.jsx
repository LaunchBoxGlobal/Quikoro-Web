import { User } from "lucide-react";

export default function ProfileCard({ profile, setBlockConfirmation }) {
  return (
    <div className="mb-6 rounded-[1.5rem] foreground p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
      <div className="flex items-center gap-6">
        <div className="rounded-full border-[1.5px] border-gray-900 p-1.5 shrink-0">
          <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#18181b]">
            {profile?.profilePicture ? (
              <img
                src={profile?.profilePicture}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={36} className="text-white" strokeWidth={1.5} />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-[28px] font-bold tracking-tight text-gray-900 mb-0.5">
            {profile?.fullName}
          </h1>
          {profile?.role === "CUSTOMER" ? (
            <p className="text-[15px] font-medium text-gray-500">
              {profile?.email}
            </p>
          ) : (
            <p className="text-[15px] font-medium text-gray-500">PROVIDER</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-xl w-full sm:w-auto gradient-bg px-8 py-3.5 text-[15px] font-medium text-white"
        >
          Report User
        </button>
        <button
          type="button"
          onClick={() => setBlockConfirmation(true)}
          className="rounded-xl w-full sm:w-auto bg-[#EA5757] px-8 py-3.5 text-[15px] font-medium text-white"
        >
          Block User
        </button>
      </div>
    </div>
  );
}
