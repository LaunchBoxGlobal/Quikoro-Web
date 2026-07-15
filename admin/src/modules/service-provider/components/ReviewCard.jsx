import StarRating from "./StarRating";

export default function ReviewCard({ review, showBorder }) {
  return (
    <div>
      {showBorder && <hr className="mb-6 border-gray-200" />}

      <div className="space-y-1">
        <h4 className="text-[15px] font-semibold text-gray-900">
          {review?.customer?.fullName}
        </h4>

        <div className="flex items-center gap-1.5">
          <StarRating size={18} className="" />

          <span className="text-[15px] font-semibold text-gray-900">
            {review?.rating}
          </span>
        </div>

        <p className="text-[14.5px] leading-[1.6] text-gray-500">
          {review?.review}
        </p>
      </div>
    </div>
  );
}
