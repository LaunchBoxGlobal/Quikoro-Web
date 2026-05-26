import { useEffect, useRef, useState } from "react";
import { Camera, User } from "lucide-react";

export default function ProfilePictureUploader({
  profilePicture,
  onUpload,
  isLoading,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (typeof profilePicture === "string") {
      setPreview(profilePicture);
    }
  }, [profilePicture]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG and JPEG allowed");

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image must be under 5MB");

      return;
    }

    const localPreview = URL.createObjectURL(file);

    setPreview(localPreview);

    try {
      const formData = new FormData();

      formData.append("profilePicture", file);

      await onUpload(formData);
    } catch (err) {
      console.log(err);
    }

    return () => URL.revokeObjectURL(localPreview);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleClick}
        className="
        relative
        w-[140px]
        h-[140px]
        rounded-full
        overflow-hidden
        border-4
        border-white
        shadow-lg
        group
        bg-gray-100
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="profile"
            className="
            w-full
            h-full
            object-cover
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User size={56} />
          </div>
        )}

        <div
          className="
          absolute
          inset-0
          bg-black/40
          opacity-0
          group-hover:opacity-100
          transition
          flex
          items-center
          justify-center
          "
        >
          <Camera size={28} color="white" />
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm">
            Uploading...
          </div>
        )}
      </button>

      <p className="text-sm text-gray-500">Click image to change</p>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="
        image/png,
        image/jpeg,
        image/jpg
        "
        onChange={handleChange}
      />
    </div>
  );
}
