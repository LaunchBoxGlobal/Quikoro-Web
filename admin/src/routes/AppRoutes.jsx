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
import UserDetailsPage from "../modules/service-provider/UserDetailsPage";
import CategoriesPage from "../modules/categories/CategoriesPage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        {/* <Route element={<PublicRoutes />}> */}
        <Route path="/login" element={<LoginPage />} />
        {/* </Route> */}

        <Route element={<MainLayout />}>
          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/service-providers" element={<ServiceProvidersPage />} />
          <Route path="/users/details/:id" element={<UserDetailsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
