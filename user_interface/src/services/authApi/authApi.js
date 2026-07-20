import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/base-url";
import { baseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // signup
    register: builder.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // login
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // forgot password - send email
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // verify otp
    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: "auth/complete-signup",
        method: "POST",
        body: data,
      }),
    }),

    // verify otp
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "otp/verify",
        method: "POST",
        body: data,
      }),
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // complete profile
    completeProfile: builder.mutation({
      query: (profileData) => ({
        url: "users/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),

    // verify id
    verifyIdentity: builder.mutation({
      query: (data) => ({
        url: "providers/id-card",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    googleAuth: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // google login
    googleLogin: builder.mutation({
      query: (idToken) => ({
        url: "google",
        method: "POST",
        body: { idToken },
      }),
      invalidatesTags: ["User"],
    }),

    // Apple login
    appleLogin: builder.mutation({
      query: (idToken) => ({
        url: "apple",
        method: "POST",
        body: { idToken },
      }),
      invalidatesTags: ["User"],
    }),

    // Get profile
    getMe: builder.query({
      query: () => "me",
      providesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: (data) => ({
        url: `auth/logout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useCompleteProfileMutation,
  useGoogleLoginMutation,
  useAppleLoginMutation,
  useVerifyEmailOtpMutation,
  useVerifyIdentityMutation,
  useLogoutUserMutation,
  useGoogleAuthMutation,
} = authApi;
