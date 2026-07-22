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
    <div className="relative hidden md:block" ref={locationRef}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="flex items-center gap-1 text-sm"
      >
        <MapPin size={15} />

        <span
          className={`font-medium ${!user?.location ? "text-gray-600" : ""}`}
        >
          {selectedAddress?.length > 0
            ? `${selectedAddress.slice(0, 30)}...`
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
