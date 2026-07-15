import React from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const Reviews = ({ booking }) => {
  const user = useSelector((state) => state.user.user);

  const userReviews = booking?.ratings?.length > 0 ? booking?.ratings : [];
  // &&
  // booking?.ratings.filter((rating) => rating?.user?.id !== user?.id);

  return (
    userReviews?.length > 0 && (
      <div className="w-full">
        <h3 className="font-bold leading-none tracking-tight">
          Client Reviews
        </h3>

        <div className="w-full">
          {userReviews?.map((rev) => {
            return (
              <div className="w-full space-y-1 mt-4" key={rev?.id}>
                <p className="font-bold tracking-tight leading-none">
                  {rev?.user?.fullName}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={18}
                      color={index < rev.rating ? "#FFCC00" : "#E5E7EB"}
                    />
                  ))}
                  <span className="font-bold relative top-0.5 left-2">
                    {rev?.rating}
                  </span>
                </div>
                <p className="text-sm text-[#767676]">{rev?.review}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Reviews;
