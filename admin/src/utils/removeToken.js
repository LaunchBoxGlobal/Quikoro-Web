import Cookies from "js-cookie";

const removeToken = () => {
  Cookies.remove("adminToken");
};

export default removeToken;
