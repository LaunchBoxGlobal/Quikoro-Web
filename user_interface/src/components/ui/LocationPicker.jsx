import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Fallback center if nothing is selected yet (Karachi - swap for whatever makes sense for you)
const DEFAULT_CENTER = { lat: 24.8607, lng: 67.0011 };
const DEFAULT_ZOOM = 12;
const SELECTED_ZOOM = 15;

const MapCamera = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !position) return;
    map.panTo(position);
    map.setZoom(SELECTED_ZOOM);
  }, [map, position]);

  return null;
};

const LocationPickerInner = ({ onConfirm, onClose, submitting }) => {
  const placesLib = useMapsLibrary("places");
  const geocodingLib = useMapsLibrary("geocoding");
  const user = useSelector((state) => state.user.user);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState(null); // { lat, lng }
  const [address, setAddress] = useState("");
  const [loadingCurrent, setLoadingCurrent] = useState(false);

  const sessionTokenRef = useRef(null);
  const geocoderRef = useRef(null);
  const debounceRef = useRef(null);

  // Create a fresh autocomplete session token once the places library is ready.
  useEffect(() => {
    if (placesLib && !sessionTokenRef.current) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
  }, [placesLib]);

  // Set up the geocoder for reverse-geocoding (lat/lng -> address text).
  useEffect(() => {
    if (geocodingLib && !geocoderRef.current) {
      geocoderRef.current = new geocodingLib.Geocoder();
    }
  }, [geocodingLib]);

  const fetchSuggestions = useCallback(
    async (value) => {
      if (!placesLib || !value.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const { suggestions: results } =
          await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: value,
            sessionToken: sessionTokenRef.current,
          });
        setSuggestions(results || []);
      } catch (err) {
        console.error("Autocomplete request failed:", err);
        setSuggestions([]);
      }
    },
    [placesLib],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleSelectSuggestion = async (suggestion) => {
    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["location", "formattedAddress"] });

      const loc = place.location;
      const nextPosition = { lat: loc.lat(), lng: loc.lng() };
      const nextAddress =
        place.formattedAddress || suggestion.placePrediction.text.text;

      setPosition(nextPosition);
      setAddress(nextAddress);
      setQuery(nextAddress);
      setSuggestions([]);

      // Google requires a new session token after a session ends (i.e. a place is picked)
      if (placesLib) {
        sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
      }
    } catch (err) {
      console.error("Could not fetch place details:", err);
    }
  };

  const reverseGeocode = (lat, lng) => {
    if (!geocoderRef.current) return;
    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === "OK" && results?.[0]) {
          setAddress(results[0].formatted_address);
          setQuery(results[0].formatted_address);
        }
      },
    );
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
    setLoadingCurrent(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const next = { lat: latitude, lng: longitude };
        setPosition(next);
        reverseGeocode(latitude, longitude);
        setLoadingCurrent(false);
      },
      (err) => {
        console.error(err);
        alert(
          "Couldn't get your location. Please allow location access and try again.",
        );
        setLoadingCurrent(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  // Click anywhere on the map to drop the pin there.
  const handleMapClick = (event) => {
    const latLng = event.detail.latLng;
    if (!latLng) return;
    setPosition(latLng);
    reverseGeocode(latLng.lat, latLng.lng);
  };

  // Let the user fine-tune by dragging the marker.
  const handleMarkerDragEnd = (event) => {
    const latLng = event.latLng;
    if (!latLng) return;
    const next = { lat: latLng.lat(), lng: latLng.lng() };
    setPosition(next);
    reverseGeocode(next.lat, next.lng);
  };

  const handleConfirm = () => {
    if (!position) return;
    onConfirm?.({
      latitude: position.lat,
      longitude: position.lng,
      location: address,
    });
  };

  return (
    <div className="w-[420px] max-w-[90vw] bg-white custom-shadow z-50 rounded-xl p-7 absolute top-full left-0 mt-2 min-h-[300px]">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold">Set Your Location</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search your location"
          className="w-full bg-gray-100 rounded-xl outline-none border-none text-sm px-4 py-3.5"
        />

        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 max-h-52 overflow-y-auto">
            {suggestions.map((s) => (
              <li
                key={s.placePrediction.placeId}
                onMouseDown={() => handleSelectSuggestion(s)}
                className="px-4 py-2.5 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {s.placePrediction.text.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full my-2 rounded-xl border h-48 overflow-hidden">
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          onClick={handleMapClick}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <MapCamera position={position} />
          {position && (
            <Marker
              position={position}
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </Map>
      </div>

      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={loadingCurrent}
        className="w-full text-center py-3.5 border rounded-xl text-sm font-semibold disabled:opacity-50"
      >
        {loadingCurrent
          ? "Detecting your location..."
          : "Use my current location"}
      </button>

      <p className="my-2 text-sm text-gray-500">
        {(user && user?.location) ||
          address ||
          "Search above, click the map, or use your current location"}
      </p>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={!position || submitting}
        className="primary-button disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Confirm Location"}
      </button>
    </div>
  );
};

/**
 * Public component. Wraps everything in APIProvider so this file is
 * fully self-contained and drop-in compatible with how you're using it now.
 *
 * Usage:
 *   <LocationPicker
 *     onConfirm={(payload) => {
 *       // payload = { latitude, longitude, location }
 *       // call your update-profile API here
 *     }}
 *   />
 */
const LocationPicker = ({ onConfirm, onClose, submitting }) => {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-[420px] max-w-[90vw] bg-white custom-shadow z-50 rounded-xl p-7 absolute top-full left-0 mt-2 min-h-[300px]">
        <p className="text-sm text-red-500">
          Missing VITE_GOOGLE_MAPS_API_KEY — add it to your .env file and
          restart the dev server.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <LocationPickerInner
        onConfirm={onConfirm}
        onClose={onClose}
        submitting={submitting}
      />
    </APIProvider>
  );
};

export default LocationPicker;
