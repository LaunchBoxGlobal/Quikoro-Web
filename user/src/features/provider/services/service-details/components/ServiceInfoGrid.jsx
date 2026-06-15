import { formatDate } from "../../../../../utils/formatDate";
import InfoItem from "./InfoItem";

export default function ServiceInfoGrid({ service }) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <InfoItem label="Date" value={formatDate(service?.createdAt)} />

      <div className="w-full">
        <div className="mb-1.5 text-[14px] text-gray-500">Availability</div>

        <div className="w-full flex items-center gap-x-1 flex-wrap">
          {service?.availableDays?.map((day) => {
            return (
              <div className="text-[14px] font-medium text-gray-900" key={day}>
                <span>{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <InfoItem
        label="Experience"
        value={service?.yearsOfExperience || "N/A"}
      />
      <InfoItem label="Address" value={service?.location} />
    </div>
  );
}
