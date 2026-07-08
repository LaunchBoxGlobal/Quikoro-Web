import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User", "BlockedUsers"],

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

    // Get blocked users
    getBlockedUsers: builder.query({
      query: ({ page }) => ({
        url: `blocks?page=${page}`,
        method: "GET",
      }),
      providesTags: ["BlockedUsers"],
    }),

    // Block user
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `blocks`,
        method: "POST",
        body: userId,
      }),
      invalidatesTags: ["User", "BlockedUsers"],
    }),

    // Unblock user
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `blocks/unblock`,
        method: "PATCH",
        body: userId,
      }),
      invalidatesTags: ["User", "BlockedUsers"],
    }),

    // Change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: `users/change-password`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Report user
    reportUser: builder.mutation({
      query: (data) => ({
        url: "reports",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateLocation: builder.mutation({
      query: (data) => ({
        url: `users/location`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useEditProfileMutation,
  useGetUserProfileByIdQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useChangePasswordMutation,
  useReportUserMutation,
  useUpdateLocationMutation,
  useGetBlockedUsersQuery,
} = userApi;
