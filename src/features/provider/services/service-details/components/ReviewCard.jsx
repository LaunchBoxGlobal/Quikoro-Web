import StarRating from "./StarRating";

export default function ReviewCard({ review, showBorder }) {
  return (
    <div>
      {showBorder && <hr className="mb-6 border-gray-200" />}

      <div>
        <h4 className="mb-1 text-[15px] font-semibold text-gray-900">
          {review.name}
        </h4>

        <div className="mb-2.5 flex items-center gap-1.5">
          <StarRating size={16} className="text-gray-900" />

          <span className="ml-1 text-[15px] font-semibold text-gray-900">
            {review.rating}
          </span>
        </div>

        <p className="text-[14.5px] leading-[1.6] text-gray-500">
          {review.text}
        </p>
      </div>
    </div>
  );
}
