import Cookies from "js-cookie";

const removeToken = () => {
  Cookies.remove("accessToken");
};

export default removeToken;
