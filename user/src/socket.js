import { io } from "socket.io-client";
import { BASE_URL } from "./utils/base-url";
import getToken from "./utils/getToken";

export const socket = io(BASE_URL, {
  autoConnect: false,

  auth: {
    token: `Bearer ${getToken()}`,
  },

  transports: ["websocket", "polling"],

  withCredentials: true,
});
