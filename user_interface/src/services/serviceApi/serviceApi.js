import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/base-url";
import { baseQuery } from "../baseQuery";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: baseQuery,
  tagTypes: ["Service"],
  endpoints: (builder) => ({
    // create service
    createService: builder.mutation({
      query: (data) => ({
        url: "services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    // get service
    getService: builder.query({
      query: (id) => ({
        url: `services/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    // get services (provider)
    getMyServices: builder.query({
      query: ({ page = 1, search = "", location = "", category = "" }) => {
        const params = new URLSearchParams();

        params.append("page", page);

        if (search) {
          params.append("search", search);
        }

        if (location) {
          params.append("location", location);
        }

        if (category && category !== "ALL") {
          params.append("categories", category);
        }

        return {
          url: `services/me?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),

    // get services (customer)
    getServices: builder.query({
      query: ({ page = 1, search = "", location = "", category = "" }) => {
        const params = new URLSearchParams();

        params.append("page", page);

        if (search) {
          params.append("search", search);
        }

        if (location) {
          params.append("location", location);
        }

        if (category && category !== "ALL") {
          params.append("categories", category);
        }
        return {
          url: `services?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),

    // updateService
    updateService: builder.mutation({
      query: ({ data, id }) => ({
        url: `services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `services/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetMyServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetServicesQuery,
  useDeleteServiceMutation,
} = serviceApi;
