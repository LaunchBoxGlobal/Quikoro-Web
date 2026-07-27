import React, { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const UserCardPictures = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const images = [];

    if (user?.cardFrontUrl) {
      images.push({
        src: user.cardFrontUrl,
        title: "Front ID Card",
      });
    }

    if (user?.cardBackUrl) {
      images.push({
        src: user.cardBackUrl,
        title: "Back ID Card",
      });
    }

    return images;
  }, [user]);

  if (slides.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 min-h-[50vh]">
        <h4 className="text-[22px] font-bold text-gray-900 mb-6">ID Card</h4>

        <div className="w-full border my-4" />

        <p className="text-gray-400 font-medium">No ID cards to display.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 min-h-[50vh]">
        <h4 className="text-[22px] font-bold text-gray-900 mb-6">ID Card</h4>

        <div className="w-full border my-4" />

        <div className="flex items-start flex-wrap gap-6 mt-6">
          {slides.map((image, i) => (
            <div key={i} className="space-y-3 w-full max-w-[300px]">
              <p className="text-sm font-medium">{image.title}</p>

              <img
                src={image.src}
                alt={image.title}
                className="w-full h-[200px] object-cover rounded-lg border cursor-pointer hover:opacity-90 transition"
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

export default UserCardPictures;
