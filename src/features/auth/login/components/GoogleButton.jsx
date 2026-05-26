import React from "react";
import { GoogleIcon } from "../../../../assets/export";
import { useGoogleLoginMutation } from "../../../../services/authApi/authApi";
import { setToken } from "../../../../hooks/useSetToken";

const GoogleButton = () => {
  const [googleLogin] = useGoogleLoginMutation();

  const handleGoogleLogin = async () => {
    // Mock Google ID token - integrate real Google Sign In SDK
    const mockIdToken = "mock-google-id-token";
    try {
      const result = await googleLogin({ idToken: mockIdToken }).unwrap();
      setToken(result);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full h-[48px] bg-[#fff] rounded-[12px] flex items-center justify-center gap-2"
    >
      <img src={GoogleIcon} alt="google icon" width={20} height={20} />
      <span className="text-[13px] font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
