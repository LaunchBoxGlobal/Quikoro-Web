import React, { useEffect, useRef, useState } from "react";
import { BsCamera, BsPlusLg } from "react-icons/bs";

const LiveProfileCapture = ({
  label = "Take live selfie",
  onChange,
  preview,
  setPreview,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);

  // Open Camera
  const openCamera = async () => {
    try {
      setError("");

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
      });

      setStream(mediaStream);

      // Open modal AFTER getting stream
      setCameraOpen(true);
    } catch (err) {
      console.error(err);
      setError("Camera access denied");
    }
  };

  useEffect(() => {
    if (cameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    }
  }, [cameraOpen, stream]);

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // Capture Selfie
  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      setError("Camera not ready yet");
      return;
    }

    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0);

    // Convert to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], "profile-selfie.jpg", {
          type: "image/jpeg",
        });

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);
        setCapturedFile(file);

        // Send file to parent
        if (onChange) {
          onChange(file);
        }

        // Close camera
        stopCamera();
        setCameraOpen(false);
      },
      "image/jpeg",
      0.9,
    );
  };

  // Upload to Backend
  const handleUpload = async () => {
    if (!capturedFile) {
      setError("Please take a selfie first");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("profilePicture", capturedFile);

      const response = await fetch("YOUR_BACKEND_API", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      alert("Profile picture uploaded successfully");
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopCamera();

      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Upload Circle */}
      <div className="flex items-center gap-3">
        <div className="w-[84px] h-[84px] bg-white rounded-full border-2 border-dashed border-gray-400 overflow-hidden relative">
          <button
            type="button"
            onClick={openCamera}
            className="w-full h-full flex items-center justify-center"
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
          </button>
        </div>

        {/* Label */}
        <div className="flex flex-col gap-2">
          {label && (
            <button
              type="button"
              onClick={openCamera}
              className="text-blue-500 font-medium underline cursor-pointer text-sm text-left"
            >
              {label}
            </button>
          )}

          {/* {capturedFile && (
            <button
              type="button"
              onClick={handleUpload}
              className="bg-black text-white px-3 py-1 rounded-md text-xs flex items-center gap-2"
            >
              <BsCamera />
              Upload Selfie
            </button>
          )} */}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-xs ml-1">{error}</p>}

      {/* Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 w-full max-w-md flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Take a Selfie</h2>

            {/* Live Camera */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-[300px] h-[300px] rounded-full object-cover bg-black"
            />

            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Capture
              </button>

              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setCameraOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveProfileCapture;
