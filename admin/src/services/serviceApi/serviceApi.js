import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery,

  endpoints: (builder) => ({
    getProviderServiceById: builder.query({
      query: ({ endpoint }) => ({
        url: endpoint,
      }),
    }),
  }),
});

export const { useGetProviderServiceByIdQuery } = serviceApi;
