import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  return (
    <div className="mt-12 lg:mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[17px] font-semibold text-gray-900">
          Rating & Reviews
        </h3>

        {reviews?.length > 10 && (
          <button
            type="button"
            className="text-[14px] font-medium text-gray-900 underline underline-offset-2 hover:text-black"
          >
            View More
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} showBorder={i > 0} />
        ))}
      </div>
    </div>
  );
}
