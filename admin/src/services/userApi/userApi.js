import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,

  endpoints: (builder) => ({
    // Get profile
    getProfile: builder.query({
      query: () => ({
        url: "/admin/users/my-profile",
      }),
    }),

    // Get users
    getUsers: builder.query({
      query: ({ search = "", page = 1, status, url }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (page) params.append("page", page);

        return {
          url: `/admin/${url}?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/users/details/${id}`,
      }),
    }),

    acceptRejectAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/providers/${id}/account-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useAcceptRejectAccountMutation,
} = userApi;
