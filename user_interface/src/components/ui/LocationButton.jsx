import React from "react";
import LocationPicker from "./LocationPicker";
import { MapPin } from "lucide-react";

const LocationButton = ({
  user,
  handleToggleDropdown,
  locationRef,
  selectedAddress,
  openLocationDropdown,
  handleLocationConfirm,
  setOpenLocationDropdown,
  isSavingLocation,
}) => {
  return (
    <div className="relative block" ref={locationRef}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="flex items-start lg:items-center gap-1"
      >
        <MapPin size={15} className="min-w-6 relative top-0.5 lg:top-0" />

        <span
          className={`font-medium text-xs md:text-sm text-start ${!user?.location ? "text-gray-600" : ""}`}
        >
          {selectedAddress?.length > 0
            ? `${selectedAddress}`
            : "Add your location"}
        </span>
      </button>

      {openLocationDropdown && (
        <LocationPicker
          onConfirm={handleLocationConfirm}
          onClose={() => setOpenLocationDropdown(false)}
          submitting={isSavingLocation}
        />
      )}
    </div>
  );
};

export default LocationButton;
