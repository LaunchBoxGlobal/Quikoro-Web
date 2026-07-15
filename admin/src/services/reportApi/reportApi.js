import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery,
  tagTypes: ["Reports"],

  endpoints: (builder) => ({
    // Get reports
    getReports: builder.query({
      query: ({ search = "", page = 1, status }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (page) params.append("page", page);

        return {
          url: `/admin/reports?${params.toString()}`,
          method: "GET",
        };
      },

      providesTags: ["Reports"],
    }),

    // Ban / Unban user
    banUnbanReportedUser: builder.mutation({
      query: ({ userId, isBanned }) => ({
        url: `/admin/users/${userId}/ban`,
        method: "PATCH", // Change if your API uses PUT/POST
        body: {
          isBanned,
        },
      }),

      invalidatesTags: ["Reports"],
    }),
  }),
});

export const { useGetReportsQuery, useBanUnbanReportedUserMutation } =
  reportApi;
