import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery,
  tagTypes: ["Settings"],

  endpoints: (builder) => ({
    submitSupportRequest: builder.mutation({
      query: (data) => ({
        url: "customer-support",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    reportBug: builder.mutation({
      query: (formData) => ({
        url: "bug-reports",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Settings"],
    }),

    updateNotificationPreference: builder.mutation({
      query: (isNotificationEnabled) => ({
        url: "users/notification",
        method: "PATCH",

        body: {
          isNotificationEnabled,
        },
      }),

      invalidatesTags: ["Settings"],
    }),

    requestOtp: builder.mutation({
      query: () => ({
        url: `users/account/request`,
        method: "DELETE",
      }),
    }),

    verifyDeleteAccountOtp: builder.mutation({
      query: (data) => ({
        url: `users/account/confirm`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useSubmitSupportRequestMutation,
  useUpdateNotificationPreferenceMutation,
  useRequestOtpMutation,
  useVerifyDeleteAccountOtpMutation,
  useReportBugMutation,
} = settingsApi;
