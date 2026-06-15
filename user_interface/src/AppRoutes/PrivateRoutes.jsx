import { Navigate, Outlet } from "react-router-dom";
import getToken from "../utils/getToken";

const PrivateRoutes = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
