import React from "react";
import { Send } from "../../../../../assets/export";
import { Image, Mic } from "lucide-react";

const SendMsgInput = ({
  message,
  setMessage,
  fileRef,
  handleFiles,
  uploading,
  handleSend,
}) => {
  return (
    <div className="p-4">
      <div className="bg-[var(--gray-bg)] rounded-full pl-5 pr-2 py-2 flex items-center gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-transparent outline-none"
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

        <button type="button" onClick={() => fileRef.current?.click()}>
          <Mic size={23} className="text-gray-600" />
        </button>

        <button
          disabled={uploading}
          onClick={handleSend}
          className="w-[38px] h-[38px] gradient-bg rounded-full flex items-center justify-center"
        >
          <img src={Send} width={15} height={15} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SendMsgInput;
