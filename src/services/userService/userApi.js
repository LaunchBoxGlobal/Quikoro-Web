import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // Get logged in user
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/me/details",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Edit profile
    editProfile: builder.mutation({
      query: (data) => ({
        url: "users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Get user by id
    getUserProfileById: builder.query({
      query: (id) => ({
        url: `/users/details/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Block user
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `blocks`,
        method: "POST",
        body: userId,
      }),
      invalidatesTags: ["User"],
    }),

    // Report user
    reportUser: builder.mutation({
      query: ({ userId, reason }) => ({
        url: `users/report/${userId}`,
        method: "POST",
        body: {
          reason,
        },
      }),
      invalidatesTags: ["User"],
    }),

    // change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: `users/change-password`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useEditProfileMutation,
  useGetUserProfileByIdQuery,
  useBlockUserMutation,
  useReportUserMutation,
  useChangePasswordMutation,
} = userApi;
