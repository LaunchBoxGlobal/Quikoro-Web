import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery,

  endpoints: (builder) => ({
    getBookingById: builder.query({
      query: ({ endpoint }) => ({
        url: endpoint,
      }),
    }),
  }),
});

export const { useGetBookingByIdQuery } = bookingApi;
