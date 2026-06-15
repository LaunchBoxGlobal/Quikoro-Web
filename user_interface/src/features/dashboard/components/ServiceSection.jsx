import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../../components/ui/SectionTitle";
import ServiceCard from "../../../components/ui/ServiceCard";
import CategoryTabs from "./CategoryTabs";
import { useSelector } from "react-redux";
import Loader from "../../../components/ui/loader/Loader";
import Error from "../../../components/ui/Error";
import { Calendar } from "lucide-react";
import { FcServices } from "react-icons/fc";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { useState } from "react";
import Pagination from "../../../components/ui/Pagination";

export default function ServiceSection({
  services,
  isError,
  isLoading,
  activeTab,
  setActiveTab,
  pagination,
  page,
  setPage,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <section className="mb-16 foreground rounded-[2rem] bg-[var(--gray-bg)] p-8 lg:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SectionTitle>
          {user && user?.user?.role === "CUSTOMER" ? "Services" : "My Service"}
        </SectionTitle>

        {user && user?.user?.role !== "CUSTOMER" && (
          <div className="">
            <Link
              to={`/provider/my-services/add-service`}
              className="primary-button"
            >
              Add New Service
            </Link>
          </div>
        )}
      </div>

      <hr className="mb-4" />
      {!isLoading && (
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {isLoading ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <Error />
          ) : (
            <>
              {services?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                  {services?.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="w-full text-center flex items-center justify-center gap-1.5 h-[40vh]">
                  <MdOutlineHomeRepairService
                    size={20}
                    className="secondary-text"
                  />
                  <p className="secondary-text text-base font-medium">
                    No services found!
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
