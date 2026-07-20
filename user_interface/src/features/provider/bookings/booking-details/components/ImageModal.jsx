import React from "react";

const ImageModal = ({
  closePreview,
  previewImages,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={closePreview}
    >
      <div
        className="relative w-full max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePreview}
          className="absolute -top-10 -right-0 text-white text-3xl"
        >
          ×
        </button>

        <img
          src={previewImages[activeIndex]}
          alt=""
          className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain mx-auto"
        />

        {previewImages?.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? previewImages?.length - 1 : prev - 1,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded"
            >
              ←
            </button>

            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === previewImages?.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded"
            >
              →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
