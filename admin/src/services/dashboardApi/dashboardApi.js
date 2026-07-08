import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,

  endpoints: (builder) => ({
    // Get users
    getDashboardStats: builder.query({
      query: ({
        registrationStartDate = "",
        registrationEndDate = "",
        bookingStartDate = "",
        bookingEndDate = "",
      }) => {
        const params = new URLSearchParams();

        if (registrationStartDate)
          params.append("registrationStartDate", registrationStartDate);
        if (registrationEndDate)
          params.append("registrationEndDate", registrationEndDate);
        if (bookingStartDate)
          params.append("bookingStartDate", bookingStartDate);
        if (bookingEndDate) params.append("bookingEndDate", bookingEndDate);

        return {
          url: `/admin/dashboard?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
