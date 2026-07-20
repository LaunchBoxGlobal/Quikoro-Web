import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useLoginMutation } from "../../../../services/authApi/authApi";
import { useSelector } from "react-redux";

const GoogleButton = ({ onSuccess, onError }) => {
  const [login] = useLoginMutation();
  const signupData = useSelector((state) => state.signup);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // TODO: confirm the token field name against your /auth/login "Google login"
      // example in Swagger — using idToken as a placeholder for now.
      const result = await login({
        authType: "GOOGLE",
        idToken: credentialResponse.credential,
        role: signupData ? signupData?.role : "",
      }).unwrap();

      onSuccess(result?.data?.user, result?.data?.accessToken);
    } catch (error) {
      onError(
        error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          "Google login failed. Please try again.",
      );
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => onError("Google login failed. Please try again.")}
        theme="none"
        size="large"
        shape="rectangular"
        text="continue_with"
        width="250"
        logo_alignment="center"
        border_radius="rounded"
      />
    </div>
  );
};

export default GoogleButton;
