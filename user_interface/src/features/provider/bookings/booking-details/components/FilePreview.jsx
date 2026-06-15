import { Music, Trash2 } from "lucide-react";
import React from "react";

const FilePreview = ({ selectedFiles, removeFile }) => {
  return (
    <>
      {!!selectedFiles.length && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {selectedFiles.map((item, index) => (
            <div key={index} className="relative">
              {item.preview ? (
                <img
                  src={item.preview}
                  className="w-20 h-20 object-cover rounded-xl"
                  alt=""
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center">
                  <Music />
                </div>
              )}

              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilePreview;
