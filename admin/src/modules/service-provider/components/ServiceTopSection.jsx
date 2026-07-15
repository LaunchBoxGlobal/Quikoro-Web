import { ImageIcon } from "lucide-react";
import { useSelector } from "react-redux";
import ServiceInfoGrid from "./ServiceInfoGrid";
import StarRating from "./StarRating";

export default function ServiceTopSection({ service }) {
  const user = useSelector((state) => state.user);
  const ratings = service?.ratings || [];

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
      : 0;

  const roundedRating = Number(averageRating.toFixed(1));

  const address = [
    service?.streetAddress,
    service?.country,
    service?.state,
    service?.city,
    service?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

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
            <h2 className="mb-1 text-[28px] lg:text-[32px] font-bold tracking-tight text-gray-900">
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
        </div>

        <hr className="my-6 border-gray-200" />

        <div>
          <h3 className="mb-3 text-[15.5px] font-semibold text-gray-900">
            Description
          </h3>

          <p className="text-[15px] leading-[1.6] text-gray-500">
            {service?.description}
          </p>
        </div>

        {/* <ServiceBiography service={service} /> */}

        <hr className="my-6 border-gray-200" />

        <ServiceInfoGrid service={service} />

        <hr className="my-6 border-gray-200" />

        <div>
          <div className="mb-1.5 text-[14px] text-gray-500">Location</div>

          <div className="text-[14px] font-medium text-gray-900">
            {service?.location}
          </div>
        </div>
      </div>
    </div>
  );
}
