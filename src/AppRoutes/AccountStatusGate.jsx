import { Navigate } from "react-router-dom";

export default function AccountStatusGate({ children, user }) {
  if (user && user.isProfileCompleted === false) {
    return <Navigate to="/complete-profile" replace />;
  }

  if (["PENDING", "SUBMITTED", "REJECTED"].includes(user?.accountStatus)) {
    return <Navigate to="/account" replace />;
  }

  // user became approved
  if (
    user?.accountStatus === "ACTIVE" &&
    window.location.pathname === "/account"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
