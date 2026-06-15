import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("accessToken", token);
};
