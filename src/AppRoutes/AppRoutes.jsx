import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { lazy } from "react";

const SignupPage = lazy(() => import("../features/auth/signup/SignupPage"));
const SelectRole = lazy(
  () => import("../features/auth/select-role/SelectRolePage"),
);
const LoginPage = lazy(() => import("../features/auth/login/LoginPage"));
const VerifyEmailPage = lazy(
  () => import("../features/auth/verify-email/VerifyEmailPage"),
);
const ForgotPassword = lazy(
  () => import("../features/auth/forgot-password/ForgotPassword"),
);
const VerifyOtp = lazy(
  () => import("../features/auth/verify-email/components/VerifyOtp"),
);
const SetNewPasswordPage = lazy(
  () => import("../features/auth/set-new-password/SetNewPasswordPage"),
);
const CompleteProfilePage = lazy(
  () => import("../features/auth/complete-profile/CompleteProfilePage"),
);
const BuyerCompleteProfilePage = lazy(
  () => import("../features/auth/complete-profile/BuyerCompleteProfilePage"),
);
const IdentityVerificationPage = lazy(
  () =>
    import("../features/auth/identity-verification/IdentityVerificationPage"),
);
const DashboardPage = lazy(() => import("../features/dashboard/DashboardPage"));
const MyBookingsPage = lazy(
  () => import("../features/provider/bookings/MyBookingsPage"),
);
const BookingDetailsPage = lazy(
  () =>
    import("../features/provider/bookings/booking-details/BookingDetailsPage"),
);
const MyServicesPage = lazy(
  () => import("../features/provider/services/MyServicesPage"),
);
const MyServiceDetailsPage = lazy(
  () =>
    import("../features/provider/services/service-details/ServicesDetailsPage"),
);
const AddServicePage = lazy(
  () => import("../features/provider/services/add-service/AddServicePage"),
);
const EditServicePage = lazy(
  () => import("../features/provider/services/edit-service/EditServicePage"),
);
const BoostServicePage = lazy(
  () => import("../features/provider/services/boost-service/BoostServicePage"),
);
const ProviderProfilePage = lazy(
  () => import("../features/provider/provider-profile/ProviderProfilePage"),
);

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import SuspenseLoader from "../components/ui/SuspenseLoader";
import SettingsLayout from "../layouts/SettingsLayout";
import { useDispatch, useSelector } from "react-redux";
import AccountStatusGate from "./AccountStatusGate";

const SettingsPage = lazy(() => import("../features/settings/SettingsPage"));
import Cookies from "js-cookie";
import AccountStatusPage from "../features/account-status/AccountStatusPage";
import { useGetUserProfileQuery } from "../services/userService/userApi";
import { setUser } from "../services/userService/userSlice";
import getToken from "../utils/getToken";
import UserProfilePage from "../features/user-profile/UserProfilePage";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const persistedUser = useSelector((state) => state.user.user);
  const token = getToken();

  const { data, isLoading } = useGetUserProfileQuery(undefined, {
    // skip: !persistedUser,
    // pollingInterval: 10000,
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data;

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <SuspenseLoader />;
  }

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<PublicRoutes />}>
            <Route path="/choose-role" element={<SelectRole />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<SetNewPasswordPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/complete-profile"
              element={
                <AccountStatusGate user={user}>
                  <CompleteProfilePage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/provider/identity-verification"
              element={
                <AccountStatusGate user={user}>
                  <IdentityVerificationPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/buyer/complete-profile"
              element={<BuyerCompleteProfilePage />}
            />
            <Route
              path="/account"
              element={
                <AccountStatusGate user={user}>
                  <AccountStatusPage />
                </AccountStatusGate>
              }
            />
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <AccountStatusGate user={user}>
                  <DashboardPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/booking-history"
              element={
                <AccountStatusGate user={user}>
                  <MyBookingsPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/booking-history/:id"
              element={
                <AccountStatusGate user={user}>
                  <BookingDetailsPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/provider/my-services"
              element={
                <AccountStatusGate user={user}>
                  <MyServicesPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/provider/my-services/:id"
              element={
                <AccountStatusGate user={user}>
                  <MyServiceDetailsPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/provider/my-services/add-service"
              element={
                <AccountStatusGate user={user}>
                  <AddServicePage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/provider/my-services/edit-service/:id"
              element={
                <AccountStatusGate user={user}>
                  <EditServicePage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/provider/my-services/:id/boost-service"
              element={
                <AccountStatusGate user={user}>
                  <BoostServicePage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/profile"
              element={
                <AccountStatusGate user={user}>
                  <ProviderProfilePage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/user/profile/:id"
              element={
                <AccountStatusGate user={user}>
                  <UserProfilePage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/settings"
              element={
                <AccountStatusGate user={user}>
                  <SettingsPage />
                </AccountStatusGate>
              }
            />
            <Route
              path="/services/:id"
              element={
                <AccountStatusGate user={user}>
                  <MyServiceDetailsPage />
                </AccountStatusGate>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
