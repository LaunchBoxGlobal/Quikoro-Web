import { Navigate, Outlet, useLocation } from "react-router-dom";
import getToken from "../utils/getToken";

const PublicRoutes = () => {
  const token = getToken();
  const location = useLocation();

  const allowedAfterAuthRoutes = ["/verify-email", "/verify-otp"];

  if (token && !allowedAfterAuthRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
