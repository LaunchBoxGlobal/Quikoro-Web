import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery,
  tagTypes: ["Notifications"],

  endpoints: (builder) => ({
    // Get notifications
    getNotifications: builder.query({
      query: ({ page = 1 }) => {
        const params = new URLSearchParams();

        params.append("page", page);

        return {
          url: `notifications?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery } =
  notificationApi;
