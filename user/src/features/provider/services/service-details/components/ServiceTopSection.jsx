import { ImageIcon } from "lucide-react";

import ActionButtons from "./ActionButtons";
import StarRating from "./StarRating";
import ServiceBiography from "./ServiceBiography";
import ServiceInfoGrid from "./ServiceInfoGrid";
import { useSelector } from "react-redux";
import ServiceProviderInfo from "./ServiceProviderInfo";

export default function ServiceTopSection({ service }) {
  const user = useSelector((state) => state.user);
  const ratings = service?.ratings || [];

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
      : 0;

  const roundedRating = Number(averageRating.toFixed(1));
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      {/* Image */}
      <div className="flex aspect-square lg:h-[340px] lg:w-[340px] shrink-0 items-center justify-center rounded-xl bg-[#e4e4e7]">
        {service?.images?.length > 0 ? (
          <img
            src={service?.images[0]}
            alt={`${service?.name} cover image`}
            className="w-full h-full rounded-xl object-cover"
          />
        ) : (
          <ImageIcon size={32} strokeWidth={1.5} className="text-gray-900" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-start">
        {/* Top */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <h2 className="mb-2 text-[28px] lg:text-[32px] font-bold tracking-tight text-gray-900">
              {service?.name}
            </h2>

            <p className="mb-2 text-[15px] font-medium text-gray-600">
              {service?.category}
            </p>

            <div className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-900">
              <StarRating rating={averageRating} />

              <span className="ml-1 leading-none">{roundedRating}</span>

              <span className="text-gray-500 font-normal">
                ({ratings.length} {ratings.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>
          {user && user?.user?.role === "CUSTOMER" && (
            <ServiceProviderInfo service={service} />
          )}
          {user && user?.user?.role === "PROVIDER" && (
            <ActionButtons service={service} />
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        <ServiceBiography service={service} />

        <hr className="my-6 border-gray-200" />

        <ServiceInfoGrid service={service} />
      </div>
    </div>
  );
}
