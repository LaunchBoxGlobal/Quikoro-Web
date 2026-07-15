import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery,
  tagTypes: ["Notifications"],

  endpoints: (builder) => ({
    // Get notifications
    getNotifications: builder.query({
      query: () => ({
        url: "notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
