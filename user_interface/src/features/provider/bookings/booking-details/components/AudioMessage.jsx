import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioMessage = ({ audioUrl, isMe, avatar }) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const animationRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds) => {
    const value = Math.ceil(seconds);

    if (isNaN(value) || value <= 0) return "0:00";

    const min = Math.floor(value / 60);
    const sec = value % 60;

    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // Smooth progress updater
  const updateProgress = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);

    if (!audioRef.current.paused && !audioRef.current.ended) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => {
      setPlaying(true);
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    const handlePause = () => {
      setPlaying(false);
      cancelAnimationFrame(animationRef.current);
    };

    const handleEnded = () => {
      cancelAnimationFrame(animationRef.current);

      setPlaying(false);

      // Fill progress completely
      setCurrentTime(audio.duration);

      // Reset after a short delay
      setTimeout(() => {
        audio.currentTime = 0;
        setCurrentTime(0);
      }, 100);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      cancelAnimationFrame(animationRef.current);

      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeek = (e) => {
    if (!progressRef.current || !audioRef.current || duration === 0) return;

    const rect = progressRef.current.getBoundingClientRect();

    const percent = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      1,
    );

    const newTime = percent * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const remainingTime = Math.max(duration - currentTime, 0);

  return (
    <div
      className={`w-full min-w-[300px] flex items-center gap-3 px-3 py-2.5 ${
        isMe
          ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
          : "bg-white text-gray-900 rounded-r-2xl rounded-tl-2xl"
      }`}
    >
      {/* Play Button */}
      <button
        onClick={togglePlay}
        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
          isMe ? "bg-cyan-800 text-gray-200" : "gradient-bg text-gray-200"
        }`}
      >
        {playing ? (
          <FaPause className="text-sm" />
        ) : (
          <FaPlay className="text-sm ml-0.5" />
        )}
      </button>

      {/* Progress */}
      <div className="flex-1 pt-2">
        <div
          ref={progressRef}
          onClick={handleSeek}
          className={`relative h-1 rounded-full cursor-pointer ${
            isMe ? "bg-white/30" : "bg-gray-300"
          }`}
        >
          {/* Filled Line */}
          <div
            className={`absolute left-0 top-0 h-full rounded-full ${
              isMe ? "bg-gray-200" : "gradient-bg"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

          {/* Progress Dot */}
          <div
            className={`absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2 -translate-x-1/2 shadow ${
              isMe ? "bg-gray-200" : "gradient-bg"
            }`}
            style={{
              left: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[10px]">
          <span className="relative -left-1">{formatTime(remainingTime)}</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-300 shrink-0">
        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

export default AudioMessage;
