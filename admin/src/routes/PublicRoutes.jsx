import { Navigate, Outlet } from "react-router-dom";
import getToken from "../utils/getToken";

const PublicRoutes = () => {
  const token = getToken();

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
