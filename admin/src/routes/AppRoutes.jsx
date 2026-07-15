import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseLoader from "../components/ui/SuspenseLoader";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../modules/auth/LoginPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import MainLayout from "../components/layout/MainLayout";
import UsersPage from "../modules/users/UsersPage";
import ServiceProvidersPage from "../modules/service-provider/ServiceProvidersPage";
import ServiceProviderDetailsPage from "../modules/service-provider/ServiceProviderDetailsPage";
import CategoriesPage from "../modules/categories/CategoriesPage";
import ReportsPage from "../modules/reports/ReportsPage";
import UserDetailsPage from "../modules/users/UserDetailsPage";
import ServiceDetailsPage from "../modules/service-provider/components/ServiceDetails";
import BookingDetailsPage from "../modules/service-provider/BookingDetailsPage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/details/:id" element={<UserDetailsPage />} />
            <Route
              path="/service-providers"
              element={<ServiceProvidersPage />}
            />
            <Route
              path="/service-providers/:id"
              element={<ServiceProviderDetailsPage />}
            />
            <Route
              path="/service-providers/:id/services/:serviceId"
              element={<ServiceDetailsPage />}
            />
            <Route
              path="/service-providers/:id/bookings/:bookingId"
              element={<BookingDetailsPage />}
            />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
