import { User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ServiceProviderInfo = ({ service }) => {
  return (
    <div className="relative">
      <p className="font-semibold text-end mb-2">Service Provider</p>

      <Link to={`/user/profile/${service?.provider?.id}`}>
        <div className="flex items-center justify-end gap-2">
          <p className="font-semibold">{service?.provider?.fullName}</p>
          <div className="w-[43px] h-[43px] rounded-full bg-black">
            {service?.provider?.profilePicture ? (
              <img
                src={service?.provider?.profilePicture}
                alt="user profile picture"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceProviderInfo;
