import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

const ImageUpload = ({
  label,
  name,
  value = [],
  onChange,
  error,
  touched,
  setFieldTouched,
  imagesError,
  bgColor = "#F5F5F5",
}) => {
  const [localError, setLocalError] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    setFieldTouched?.(name, true);

    setLocalError("");

    if (!files.length) {
      onChange([]);
      return;
    }

    // min/max validation
    if (files.length < 1) {
      setLocalError("Minimum 1 image is required");

      return;
    }

    if (files.length > 5) {
      setLocalError("Maximum 5 images allowed");

      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    const maxSize = 4 * 1024 * 1024;

    for (const file of files) {
      // type validation
      if (!allowedTypes.includes(file.type)) {
        setLocalError("Only PNG, JPG and JPEG images are allowed");

        return;
      }

      // size validation
      if (file.size > maxSize) {
        setLocalError("Each image must be less than 4MB");

        return;
      }
    }

    onChange(files);
  };

  return (
    <div className="w-full flex flex-col gap-1 space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold leading-none">
          {label}
        </label>
      )}

      <label
        htmlFor={name}
        className={`w-full min-h-[160px] rounded-xl border border-dashed p-5 cursor-pointer transition-all flex flex-col items-center justify-center
        ${error || localError ? "border-red-500" : "border-gray-400"}`}
        style={{ background: bgColor }}
      >
        <>
          <BsPlusLg size={24} className="mb-3 text-[var(--secondary)]" />

          <p className="text-sm text-gray-700">Upload Images</p>

          <p className="text-xs text-gray-400 mt-1">Min 1 - Max 5 Images</p>

          <p className="text-xs text-gray-400">PNG, JPG, JPEG • Max 4MB each</p>
        </>
      </label>

      <input
        id={name}
        name={name}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />

      {localError && <p className="text-red-500 text-xs mt-1">{localError}</p>}

      {!localError && touched && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      {imagesError && (
        <span className="text-red-500 text-xs mt-1">{imagesError}</span>
      )}
    </div>
  );
};

export default ImageUpload;
