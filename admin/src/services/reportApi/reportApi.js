import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery,

  endpoints: (builder) => ({
    // Get users
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
    }),
  }),
});

export const { useGetReportsQuery } = reportApi;
