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

  // ===== VOICE RECORDING STATE (NEW) =====
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);

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
    if (!socket.connected) return;

    socket.emit("join-conversation", {
      bookingId: id,
    });

    const handleNewMessage = (msg) => {
      // console.log("NEW MESSAGE >>> ", msg);
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
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);

      socket.emit("leave-conversation", {
        bookingId: id,
      });
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

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // ===== VOICE RECORDING HANDLERS (NEW) =====
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("MIC ACCESS ERROR", err);
    }
  };

  // Stops the recorder and resolves with the recorded audio File
  const stopRecordingAndGetFile = () => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;

      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        resolve(null);
        return;
      }

      mediaRecorder.onstop = () => {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioFile = new File([audioBlob], `voice-${Date.now()}.mp3`, {
          type: "audio/webm",
        });

        audioChunksRef.current = [];
        resolve(audioFile);
      };

      mediaRecorder.stop();
      clearInterval(recordingIntervalRef.current);
      setIsRecording(false);
    });
  };

  const cancelRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.onstop = () => {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorder.stop();
    }

    clearInterval(recordingIntervalRef.current);
    audioChunksRef.current = [];
    setIsRecording(false);
    setRecordingTime(0);
  };

  const handleSendVoiceMessage = async () => {
    const audioFile = await stopRecordingAndGetFile();
    setRecordingTime(0);

    if (!audioFile) return;

    // create a local object URL so the optimistic message can render/play immediately
    const audioPreviewUrl = URL.createObjectURL(audioFile);

    await handleSend({
      file: audioFile,
      preview: audioPreviewUrl,
      isVoice: true,
    });
  };

  // MODIFIED: now accepts an optional voiceItem ({ file, preview, isVoice })
  const handleSend = async (voiceItem = null) => {
    const filesToSend = voiceItem ? [voiceItem] : selectedFiles;
    const isVoiceMessage = !!voiceItem;

    if (!message.trim() && !filesToSend.length) {
      return;
    }

    try {
      setUploading(true);

      let media = [];

      // type: AUDIO for voice notes, MEDIA for image/audio attachments, TEXT otherwise
      let type = isVoiceMessage
        ? "AUDIO"
        : filesToSend.length
          ? "IMAGE"
          : "TEXT";

      // MEDIA FLOW (same pipeline for images, attached audio files, and voice notes)
      if (filesToSend.length) {
        console.log("filesToSend >> ", filesToSend);
        // STEP 1: REQUEST PRESIGNED URLS
        const body = {
          files: filesToSend.map((item) => ({
            fileName: item.file.name,
            mimeType: item.file.type, // "audio/webm" — send this explicitly
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
              const currentFile = filesToSend[index].file;

              await fetch(item.uploadUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": currentFile.type,
                },
                body: currentFile,
              });

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
        type,
      };

      socket.emit("send-message", payload);

      const optimisticMessage = {
        id: Date.now(),
        senderId: user.id,
        receiverId,
        message: message.trim(),
        media: filesToSend.filter((f) => f.preview).map((f) => f.preview),
        type,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => ({
        ...prev,
        today: [...(prev.today || []), optimisticMessage],
      }));

      setMessage("");

      if (!isVoiceMessage) {
        setSelectedFiles([]);
        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }
    } catch (err) {
      console.log("SEND ERROR", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed bottom-4 z-50 w-[calc(100%-32px)] sm:w-[95%] md:w-[520px] h-[90vh] left-1/2 -translate-x-1/2 md:left-auto md:right-5 md:translate-x-0 bg-white rounded-[32px] overflow-hidden overflow-x-hidden flex flex-col custom-shadow">
      {/* HEADER */}
      <ChatHeader setOpenChat={setOpenChat} chatUser={chatUser} />

      {/* MESSAGES */}
      {loadingMessages ? (
        <div className="flex-1 overflow-y-auto p-5 space-y-4 flex items-center justify-center px-5">
          <p className="">Loading messages...</p>
        </div>
      ) : (
        <MessagesList messages={messages} user={user} chatUser={chatUser} />
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
        handleSend={() => handleSend()}
        isRecording={isRecording}
        recordingTime={recordingTime}
        startRecording={startRecording}
        cancelRecording={cancelRecording}
        handleSendVoiceMessage={handleSendVoiceMessage}
      />
    </div>
  );
};

export default ChatWindow;
