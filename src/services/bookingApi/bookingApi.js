import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { baseQuery } from "../baseQuery";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery,
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    // get all bookings
    getBookings: builder.query({
      query: ({ page = 1, status = "PENDING", search }) => ({
        url: `bookings?page=${page}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    // get booking
    getBooking: builder.query({
      query: (id) => ({
        url: `bookings/${id}`,
      }),
      providesTags: ["Bookings"],
    }),

    // Create booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: `bookings`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Create booking
    updateBooking: builder.mutation({
      query: ({ bookingData, id }) => ({
        url: `bookings/${id}`,
        method: "PUT",
        body: bookingData,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // update booking status by provider and customer
    updateBookingStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `bookings/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),

    // write a reivew
    writeReview: builder.mutation({
      query: (data) => ({
        url: `ratings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useWriteReviewMutation,
} = bookingApi;
