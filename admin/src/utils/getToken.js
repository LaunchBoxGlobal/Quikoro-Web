import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("adminToken");
  return token || null;
};

export default getToken;
