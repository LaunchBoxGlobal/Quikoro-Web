import React, { useState } from "react";
import ServiceCard from "../../../../components/ui/ServiceCard";
import SectionTitle from "../../../../components/ui/SectionTitle";
import Search from "../../../../components/ui/Search";
import Button from "../../../../components/ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMyServicesQuery } from "../../../../services/serviceApi/serviceApi";
import Loader from "../../../../components/ui/loader/Loader";
import Error from "../../../../components/ui/Error";
import CategoryTabs from "../../../dashboard/components/CategoryTabs";
import { MdOutlineHomeRepairService } from "react-icons/md";

const ServicesSection = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState(null);
  const { data, isLoading, isError, isFetching } = useGetMyServicesQuery(
    {
      page: 1,
      search,
      category: activeTab,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const services = data?.data?.data;
  return (
    <main className="w-full mb-16 min-h-screen">
      <section className="rounded-[2rem] foreground p-8 lg:p-10">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <SectionTitle>My Services</SectionTitle>

          <div className="flex items-center gap-2">
            <Search isLoading={isLoading} />
            <div className="min-w-[175px]">
              <Button
                type="button"
                text={`Add New Service`}
                onclick={() => navigate("/provider/my-services/add-service")}
              />
            </div>
          </div>
        </div>

        <hr className="mb-8 border-gray-200/80" />

        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {isLoading || isFetching ? (
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
                  <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </main>
  );
};

export default ServicesSection;
