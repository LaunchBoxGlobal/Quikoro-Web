import React, { useEffect, useRef } from "react";
import { Send } from "../../../../../assets/export";
import { Image, Mic, Trash2, Check } from "lucide-react";

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const SendMsgInput = ({
  message,
  setMessage,
  fileRef,
  handleFiles,
  uploading,
  handleSend,
  isRecording,
  recordingTime,
  startRecording,
  cancelRecording,
  handleSendVoiceMessage,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="px-4 pb-4 pt-4 bg-gray-100">
      <div className="bg-white rounded-full pl-5 pr-2 py-2 flex items-center gap-2">
        {isRecording ? (
          // ===== RECORDING UI (WhatsApp style) =====
          <>
            <div className="flex-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-gray-700">
                {formatTime(recordingTime)}
              </span>
              <span className="text-sm text-gray-400">Recording...</span>
            </div>

            <button type="button" onClick={cancelRecording}>
              <Trash2 size={21} className="text-red-500" />
            </button>

            <button
              type="button"
              onClick={handleSendVoiceMessage}
              className="w-[38px] h-[38px] gradient-bg rounded-full flex items-center justify-center"
            >
              <Check size={18} className="text-white" />
            </button>
          </>
        ) : (
          // ===== DEFAULT UI =====
          <>
            <input
              value={message}
              ref={inputRef}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              className="flex-1 bg-white outline-none"
            />
            <input
              ref={fileRef}
              hidden
              type="file"
              multiple
              accept="image/*,audio/*"
              onChange={handleFiles}
            />

            <button type="button" onClick={() => fileRef.current?.click()}>
              <Image size={21} className="text-gray-600" />
            </button>

            <button type="button" onClick={startRecording}>
              <Mic size={23} className="text-gray-600" />
            </button>

            <button
              disabled={uploading}
              onClick={handleSend}
              className="w-[38px] h-[38px] gradient-bg rounded-full flex items-center justify-center"
            >
              <img src={Send} width={15} height={15} alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SendMsgInput;
