import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("accessToken");
  return token || null;
};

export default getToken;
