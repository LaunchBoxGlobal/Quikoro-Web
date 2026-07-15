import React from "react";
import ServiceTopSection from "./ServiceTopSection";
import { useParams } from "react-router-dom";
import { useGetProviderServiceByIdQuery } from "../../../services/serviceApi/serviceApi";
import ReviewList from "./ReviewList";
import Loader from "../../../components/ui/Loader";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const { data, isLoading, isError } = useGetProviderServiceByIdQuery({
    endpoint: `/services/${serviceId}`,
  });
  const service = data?.data;
  const reviews = data?.data?.ratings;
  return (
    <div className="min-h-screen w-full text-gray-900">
      <div className="mx-auto">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-[32px] font-bold tracking-tight">
            Service Details
          </h1>
        </div>

        {isLoading ? (
          <div className="w-full min-h-[50vh] rounded-3xl pt-20 flex items-center justify-center bg-white">
            <Loader />
          </div>
        ) : (
          <section className="">
            <div className="rounded-2xl foreground border border-gray-200 p-6 sm:p-8 lg:p-10">
              <ServiceTopSection service={service} />
              {reviews?.length > 0 && <ReviewList reviews={reviews} />}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
