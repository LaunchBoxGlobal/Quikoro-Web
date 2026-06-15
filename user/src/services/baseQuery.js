import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/base-url";

import getToken from "../utils/getToken";
import removeToken from "../utils/removeToken";

import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

import { clearUser } from "./userService/userSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers) => {
    const token = getToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("ngrok-skip-browser-warning", true);

    return headers;
  },
});

export const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const newAccessToken = result?.meta?.response?.headers?.get("x-access-token");

  if (newAccessToken) {
    Cookies.set("accessToken", newAccessToken);
  }

  if (result?.error?.status === 401) {
    api.dispatch(clearUser());

    removeToken();

    localStorage.removeItem("persist:user");

    enqueueSnackbar("Session expired. Login again.", {
      variant: "error",
    });

    window.location.replace("/login");
  }

  return result;
};
