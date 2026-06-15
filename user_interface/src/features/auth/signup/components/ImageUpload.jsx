import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

const ImageUpload = ({
  label,
  name = "profilePicture",
  value,
  onChange,
  error,
  touched,
  setFieldTouched,
}) => {
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (value instanceof File) {
      const imageUrl = URL.createObjectURL(value);
      setPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setFieldTouched?.(name, true);

    if (!file) {
      onChange(null);
      return;
    }

    setLocalError("");

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      setLocalError("Only PNG, JPG, and JPEG images are allowed");

      onChange(null);

      e.target.value = "";

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setLocalError("Image size must be less than 5MB");

      onChange(null);

      e.target.value = "";

      return;
    }

    onChange(file);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="w-[84px] h-[84px] bg-white rounded-full border-2 border-dashed border-gray-400 overflow-hidden relative">
          <label
            htmlFor={name}
            className="flex items-center justify-center w-full h-full cursor-pointer"
          >
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <BsPlusLg className="text-[var(--secondary)]" size={26} />
            )}
          </label>

          <input
            id={name}
            name={name}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {label && (
          <label
            htmlFor={name}
            className="text-blue-500 font-medium underline cursor-pointer text-sm"
          >
            {label}
          </label>
        )}
      </div>

      {localError && <p className="text-red-500 text-xs ml-1">{localError}</p>}

      {!localError && touched && error && (
        <p className="text-red-500 text-xs ml-1">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
