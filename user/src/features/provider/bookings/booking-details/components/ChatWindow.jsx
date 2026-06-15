import { User, X, Image, Music, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { socket } from "../../../../../socket";
import { Send } from "../../../../../assets/export";
import { BASE_URL } from "../../../../../utils/base-url";
import getToken from "../../../../../utils/getToken";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SendMsgInput from "./SendMsgInput";
import ChatHeader from "./ChatHeader";
import FilePreview from "./FilePreview";
import MessagesList from "./MessagesList";

const ChatWindow = ({ setOpenChat, booking }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const receiverId =
    user?.role === "CUSTOMER" ? booking?.provider?.id : booking?.customer?.id;
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatUser =
    user?.role === "CUSTOMER" ? booking?.provider : booking?.customer;

  console.log(messages);

  // OLD MESSAGES
  useEffect(() => {
    const fetchMessages = async () => {
      const token = getToken();
      const url = `${BASE_URL}bookings/${id}/messages`;
      setLoadingMessages(true);
      try {
        const res = await fetch(`${BASE_URL}bookings/${id}/messages`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": true,
          },
        });

        const data = await res.json();
        setMessages(data?.data || {});

        // setMessages(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMessages(false);
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
      // console.log("RECEIVED NEW MESSAGES >>> ", msg);
      const normalized = {
        id: msg.message?.id,
        message: msg.message?.message,
        media: msg.media || [],
        type: msg.message?.type,
        createdAt: msg.message?.createdAt,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
      };

      setMessages((prev) => ({
        ...prev,
        today: [...(prev.today || []), normalized],
      }));
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

  // const removeFile = (index) => {
  //   setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  // };
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    // Reset file input so same file can be selected again
    if (fileRef.current) {
      fileRef.current.value = "";
    }
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
            try {
              const currentFile = selectedFiles[index].file;

              const uploadRes = await fetch(item.uploadUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": currentFile.type,
                },
                body: currentFile,
              });

              console.log("ITEM >>> ", item);

              media.push({
                key: item.mediaKey,
                type: item.mimeType,
              });
            } catch (err) {
              console.error("UPLOAD ITEM ERROR", err);
            }
          }),
        );
      }
      // STEP 3: SOCKET PAYLOAD
      const payload = {
        bookingId: id,
        senderId: user?.id,
        receiverId,
        message: message.trim(),
        media,
      };

      socket.emit("send-message", payload);
      const optimisticMessage = {
        id: Date.now(),
        senderId: user.id,
        receiverId,
        message: message.trim(),
        media: selectedFiles.filter((f) => f.preview).map((f) => f.preview),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => ({
        ...prev,
        // today: [...(prev.today || []), payload],
        today: [...(prev.today || []), optimisticMessage],
      }));
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
    <div className="fixed bottom-4 right-6 z-50 w-[95%] max-w-[520px] h-[650px] bg-white rounded-[32px] overflow-hidden flex flex-col custom-shadow">
      {/* HEADER */}
      <ChatHeader setOpenChat={setOpenChat} chatUser={chatUser} />

      {/* MESSAGES */}
      {loadingMessages ? (
        <div className="flex-1 overflow-y-auto p-5 space-y-4 flex items-center justify-center px-5">
          <p className="">Loading messages...</p>
        </div>
      ) : (
        <MessagesList messages={messages} user={user} />
      )}

      {/* PREVIEW */}
      <FilePreview selectedFiles={selectedFiles} removeFile={removeFile} />

      {/* INPUT */}
      <SendMsgInput
        message={message}
        setMessage={setMessage}
        fileRef={fileRef}
        handleFiles={handleFiles}
        uploading={uploading}
        handleSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;
