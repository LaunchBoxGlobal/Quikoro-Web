import { Star, User } from "lucide-react";

export default function ProfileCard({
  profile,
  setBlockConfirmation,
  setShowReportModal,
  handleUnblockUser,
  isUnblocking,
}) {
  const rating = profile?.ratings?.averageRating || 0;
  return (
    <div className="mb-6 rounded-[1.5rem] foreground p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
      <div className="flex items-center gap-6">
        <div className="rounded-full border-[1.5px] border-gray-900 p-1.5 shrink-0">
          <div className="flex h-[64px] w-[64px] lg:h-[84px] lg:w-[84px] items-center justify-center rounded-full bg-[#18181b]">
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
          <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-gray-900 mb-0.5 leading-none">
            {profile?.fullName}
          </h1>
          {profile?.role === "CUSTOMER" ? (
            <p className="text-[15px] font-medium text-gray-500">
              {profile?.email}
            </p>
          ) : (
            <p className="text-[15px] font-medium text-gray-500">PROVIDER</p>
          )}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={15}
                  className={
                    star <= Math.round(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
            </div>

            <span className="text-sm font-medium ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          disabled={profile?.isReported}
          onClick={() => setShowReportModal(true)}
          className="rounded-xl w-full sm:w-auto gradient-bg px-8 py-3.5 text-[15px] font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Report User
        </button>
        {profile?.isBlocked ? (
          <button
            type="button"
            onClick={() => handleUnblockUser()}
            className="rounded-xl w-full sm:w-auto bg-[#EA5757] px-8 py-3.5 text-[15px] font-medium text-white"
          >
            {isUnblocking ? "Unblocking..." : "Unblock User"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setBlockConfirmation(true)}
            className="rounded-xl w-full sm:w-auto bg-[#EA5757] px-8 py-3.5 text-[15px] font-medium text-white"
          >
            Block User
          </button>
        )}
      </div>
    </div>
  );
}
