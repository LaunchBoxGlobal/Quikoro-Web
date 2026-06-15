import { useEffect, useState } from "react";

const RESEND_TIME = 60;

const ResendOtp = ({ onResend }) => {
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft > 0) return;

    onResend?.();

    setTimeLeft(RESEND_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={timeLeft > 0}
      className={`
        font-semibold
        transition-all
        ${
          timeLeft > 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-black hover:opacity-70"
        }
      `}
    >
      {timeLeft > 0 ? `${formatTime(timeLeft)}` : "Resend code"}
    </button>
  );
};

export default ResendOtp;
