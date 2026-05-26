import { User, X, Image as ImageIcon, Image } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../../../../socket";
import { Send } from "../../../../../assets/export";
import { BASE_URL } from "../../../../../utils/base-url";
import getToken from "../../../../../utils/getToken";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatWindow = ({ setOpenChat, bookingId, booking }) => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const receiverId =
    user?.role === "CUSTOMER" ? booking?.provider?.id : booking?.customer?.id;

  const [messages, setMessages] = useState([]);

  const fileRef = useRef();

  // FETCH OLD MESSAGES
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${BASE_URL}bookings/${id}/messages`, {
          method: "GET",
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

  // CONNECT SOCKET
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("CONNECTED", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("SOCKET ERROR:", err.message);
    });

    socket.emit("join-conversation", { bookingId: id });

    socket.on("new-message", (msg) => {
      console.log(msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new-message");

      socket.disconnect();
    };
  }, [id]);

  // SEND TEXT
  // const handleSend = () => {
  //   if (!message.trim()) return;

  //   const payload = {
  //     bookingId: id,
  //     senderId: user?.id,
  //     receiverId,
  //     type: "TEXT",
  //     message,
  //   };

  //   socket.emit("send-message", payload);

  //   setMessages((prev) => [...prev, payload]);

  //   setMessage("");
  // };

  const handleSend = async () => {
    if (!message.trim() && !selectedFiles.length) {
      return;
    }

    try {
      let uploadedUrls = [];

      // upload only when SEND clicked
      if (selectedFiles.length) {
        setUploading(true);

        const formData = new FormData();

        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

        const res = await fetch(`${BASE_URL}upload`, {
          method: "POST",

          headers: {
            Authorization: `Bearer ${getToken()}`,
          },

          body: formData,
        });

        const data = await res.json();

        uploadedUrls = data.urls || [];
      }

      const payload = {
        bookingId: id,

        senderId: user?.id,

        receiverId,

        message: {
          id: crypto.randomUUID(),

          type: uploadedUrls.length ? "MEDIA" : "TEXT",

          message,

          files: uploadedUrls,

          createdAt: new Date().toISOString(),
        },
      };

      socket.emit("send-message", payload);

      // optimistic UI
      setMessages((prev) => [...prev, payload]);

      setMessage("");

      setSelectedFiles([]);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  // SEND IMAGE
  const handleImage = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const payload = {
        bookingId,
        sender: "me",
        type: "image",
        image: reader.result,
        createdAt: new Date().toISOString(),
      };

      socket.emit("send_message", payload);

      setMessages((prev) => [...prev, payload]);
    };

    reader.readAsDataURL(file);
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setSelectedFiles(files);
  };

  // const handleImage = (e) => {
  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setSelectedImage(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  return (
    <div className="fixed bottom-4 right-6 z-50 w-[95%] max-w-[520px] h-[700px] bg-[#fff] custom-shadow rounded-[32px] overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="gradient-bg min-h-[86px] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center">
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
        {messages?.map((item, index) => {
          const isMe = item.senderId === user?.id;

          const text =
            typeof item.message === "string"
              ? item.message // my sent message
              : item.message?.message; // received message

          return (
            <div
              key={item.message?.id || index}
              className={`w-full flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 max-w-[70%] break-words ${
                  isMe
                    ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
                    : "bg-[var(--gray-bg)] rounded-r-2xl rounded-tl-2xl"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="p-4">
        <div className="bg-[var(--gray-bg)] rounded-full flex items-center pr-2 pl-6 py-2 gap-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 outline-none bg-transparent"
          />

          {/* <button type="button">
            <Image size={24} className="text-gray-600" />
          </button> */}

          <input
            ref={fileRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <button
            onClick={handleSend}
            className="w-[37px] h-[37px] gradient-bg rounded-full flex items-center justify-center"
          >
            <img src={Send} width={15} height={15} alt="send message icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
