import React, { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () => images.map((image) => ({ src: image })),
    [images],
  );

  if (images.length === 0) return;
  //     {
  //     return (
  //       <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 min-h-[50vh]">
  //         <h4 className="text-[22px] font-bold text-gray-900">
  //           Reference Images
  //         </h4>

  //         <div className="w-full border mb-6 mt-4"></div>

  //         <p className="text-gray-400 font-medium">
  //           No reference images to display.
  //         </p>
  //       </div>
  //     );
  //   }

  return (
    <>
      <div className="bg-white py-6 lg:py-8 min-h-[50vh]">
        <h4 className="text-[22px] font-bold text-gray-900">
          Reference Images
        </h4>

        <div className="w-full border mb-6 mt-4"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {images.map((image, i) => (
            <div key={i} className="space-y-3">
              <img
                src={image}
                alt={image}
                className="w-[300px] h-[200px] object-cover rounded-lg border cursor-pointer hover:opacity-90 transition"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{
          view: ({ index }) => setIndex(index),
        }}
      />
    </>
  );
};

export default ImageGallery;
