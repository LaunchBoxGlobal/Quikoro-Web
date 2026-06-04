import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { LocationIcon } from "../../assets/export";
import { FaStar } from "react-icons/fa";

export default function ServiceCard({ service }) {
  const user = useSelector((state) => state.user.user);
  const url =
    user?.role === "CUSTOMER"
      ? `/services/${service?.id}`
      : `/provider/my-services/${service?.id}`;

  const ratings = service?.ratings;

  const averageRating =
    ratings?.length > 0
      ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
      : 0;

  const roundedRating = Number(averageRating.toFixed(1));
  const ratingPercentage = (averageRating / 5) * 100;
  return (
    <Link to={url}>
      <div className="flex gap-4 rounded-xl bg-[var(--gray-bg)] p-4 shadow-sm">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
          {service?.images?.length > 0 ? (
            <img
              src={service?.images[0]}
              alt={`${service?.name} cover image`}
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            <ImageIcon size={28} strokeWidth={1.5} />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between py-1">
          <div className="flex items-start justify-between">
            {service?.name && (
              <h3 className="font-semibold text-[17px]">{service?.name}</h3>
            )}
            <div className="flex items-center gap-1">
              <span className="font-bold text-[14px]">{roundedRating}</span>

              <div className="relative w-5 h-5">
                {/* Empty star */}
                <FaStar className="absolute text-gray-300 w-5 h-5" />

                {/* Filled portion */}
                <div
                  className="absolute overflow-hidden"
                  style={{ width: `${ratingPercentage}%` }}
                >
                  <FaStar className="text-[#FFCC00] w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between font-medium text-gray-500 text-[14.5px]">
            {service.category && (
              <span className="text-gray-400 font-normal text-sm">
                {service.category}
              </span>
            )}

            {user?.role === "PROVIDER" && (
              <span className="text-gray-400 font-normal text-sm">
                {formatDate(service?.createdAt)}
              </span>
            )}

            {user?.role === "CUSTOMER" && (
              <div className="flex items-center justify-end gap-1">
                <img src={LocationIcon} alt="location icon" width={12} />
                <span className="text-gray-400 font-normal text-sm">
                  Distance
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
