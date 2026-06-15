import React from "react";
import { AppleIcon } from "../../../../assets/export";
import { useAppleLoginMutation } from "../../../../services/authApi/authApi";
import { setToken } from "../../../../hooks/useSetToken";

const AppleButton = () => {
  const [appleLogin] = useAppleLoginMutation();

  const handleAppleLogin = async () => {
    // Mock Apple ID token - integrate real Apple Sign In
    const mockIdToken = "mock-apple-id-token";
    try {
      const result = await appleLogin({ idToken: mockIdToken }).unwrap();
      setToken(result);
    } catch (error) {
      console.error("Apple login failed:", error);
      alert("Apple login failed");
    }
  };

  return (
    <button
      onClick={handleAppleLogin}
      className="w-full h-[48px] bg-[#fff] rounded-[12px] flex items-center justify-center gap-2"
    >
      <img src={AppleIcon} alt="apple icon" width={20} height={20} />
      <span className="text-[13px] font-medium">Continue with Apple</span>
    </button>
  );
};

export default AppleButton;
