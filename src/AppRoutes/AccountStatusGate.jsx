import { Navigate, useLocation } from "react-router-dom";

export default function AccountStatusGate({ children, user }) {
  const location = useLocation();

  if (user && user.isProfileCompleted === false) {
    return <Navigate to="/complete-profile" replace />;
  }

  const blockedStatuses = ["PENDING", "SUBMITTED", "REJECTED"];

  // pending users → account page
  if (
    blockedStatuses.includes(user?.accountStatus) &&
    location.pathname !== "/account"
  ) {
    return <Navigate to="/account" replace />;
  }

  // active users cannot stay on account page
  if (user?.accountStatus === "ACTIVE" && location.pathname === "/account") {
    return <Navigate to="/" replace />;
  }

  return children;
}
