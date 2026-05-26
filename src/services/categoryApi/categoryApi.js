import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/base-url";
import { baseQuery } from "../baseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
