import { User, X, Image, Music, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { socket } from "../../../../../socket";
import { Send } from "../../../../../assets/export";
import { BASE_URL } from "../../../../../utils/base-url";
import getToken from "../../../../../utils/getToken";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatWindow = ({ setOpenChat, booking }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const receiverId =
    user?.role === "CUSTOMER" ? booking?.provider?.id : booking?.customer?.id;

  // OLD MESSAGES
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${BASE_URL}bookings/${id}/messages`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await res.json();

        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [id]);

  // SOCKET
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("CONNECTED", socket.id);
    });

    socket.emit("join-conversation", {
      bookingId: id,
    });

    socket.on("new-message", (msg) => {
      console.log("NEW_MESSAGE >>> ", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new-message");

      socket.disconnect();
    };
  }, [id]);

  // FILE SELECT
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const allowed = files.filter((file) => {
      return file.type.startsWith("image/") || file.type.startsWith("audio/");
    });

    const mapped = allowed.map((file) => ({
      file,

      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setSelectedFiles((prev) => [...prev, ...mapped]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedFiles.length) {
      return;
    }

    try {
      setUploading(true);

      let media = [];

      let type = "TEXT";

      // MEDIA FLOW
      if (selectedFiles.length) {
        // STEP 1: REQUEST PRESIGNED URLS

        const body = {
          files: selectedFiles.map((item) => ({
            fileName: item.file.name,
            bookingId: id,
          })),
        };

        const res = await fetch(`${BASE_URL}media/presigned`, {
          method: "POST",

          headers: {
            Authorization: `Bearer ${getToken()}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),
        });

        const response = await res.json();

        const uploadedFiles = response?.data || [];

        // STEP 2: UPLOAD FILES TO S3
        await Promise.all(
          uploadedFiles.map(async (item, index) => {
            const currentFile = selectedFiles[index].file;

            const uploadRes = await fetch(item.uploadUrl, {
              method: "PUT",

              // headers: {
              //   "Content-Type": currentFile.type,
              // },

              body: currentFile,
            });

            if (!uploadRes.ok) {
              throw new Error("UPLOAD FAILED");
            }

            // KEEP KEYS AFTER SUCCESS

            media.push({
              key: item.mediaKey,

              type: item.mimeType,
            });
          }),
        );

        // STEP 3: DETERMINE TYPE
        const hasImage = media.some((m) => m.type.startsWith("image/"));

        const hasAudio = media.some((m) => m.type.startsWith("audio/"));

        if (hasImage) {
          type = "IMAGE";
        } else if (hasAudio) {
          type = "";
        }
      }

      // STEP 4: SOCKET PAYLOAD

      const payload = {
        bookingId: id,

        senderId: user?.id,

        receiverId,

        message: message.trim(),

        media:
          media.length > 0
            ? media
            : [
                {
                  key: "",

                  type: "",
                },
              ],
      };

      console.log("FINAL PAYLOAD", payload);

      socket.emit("send-message", payload);

      // optimistic update

      setMessages((prev) => [...prev, payload]);

      // reset

      setMessage("");

      setSelectedFiles([]);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (err) {
      console.log("SEND ERROR", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-6 z-50 w-[95%] max-w-[520px] h-[700px] bg-white rounded-[32px] overflow-hidden flex flex-col custom-shadow">
      {/* HEADER */}
      <div className="gradient-bg min-h-[86px] px-4 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <User />
          </div>

          <h2 className="text-white">Chat</h2>
        </div>

        <button onClick={() => setOpenChat(false)}>
          <X color="white" />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((item, index) => {
          const isMe = item.senderId === user?.id;

          const text =
            typeof item.message === "string"
              ? item.message
              : item.message?.message || "";

          const media = Array.isArray(item.media) ? item.media : [];

          return (
            <div
              key={item.message?.id || index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 max-w-[75%] space-y-2 ${
                  isMe
                    ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
                    : "bg-gray-100 rounded-r-2xl rounded-tl-2xl"
                }`}
              >
                {/* images */}
                {media.map((mediaItem, i) => (
                  <img
                    key={i}
                    src={mediaItem}
                    alt={`media-${i}`}
                    className="mt-2 rounded-lg max-w-[150px]"
                  />
                ))}
                {/* text */}
                {text && <p>{text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* PREVIEW */}

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

      {/* INPUT */}

      <div className="p-4">
        <div className="bg-[var(--gray-bg)] rounded-full px-5 py-2 flex items-center gap-2">
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
            <Image size={22} />
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
    </div>
  );
};

export default ChatWindow;
