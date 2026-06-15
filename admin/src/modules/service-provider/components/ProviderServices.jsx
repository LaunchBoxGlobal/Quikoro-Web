import React from "react";
import { useGetProviderServicesAndBookingsQuery } from "../../../services/userApi/userApi";
import PageLoader from "../../../components/ui/PageLoader";
import ErrorPage from "../../../components/ui/PageError";
import Loader from "../../../components/ui/Loader";

const ProviderServices = ({ user }) => {
  const { data, isLoading, isError, refetch } =
    useGetProviderServicesAndBookingsQuery({
      endpoint: `/admin/providers/${user?.id}/services?page=1`,
    });

  const services = data?.data?.data;
  const pagination = data?.data?.pagination;

  if (isError) return <ErrorPage onRetry={refetch} />;
  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50">
      <h3 className="text-[22px] font-bold text-gray-900 mb-6">
        Services {services && `(${services?.length})`}
      </h3>

      <div className="w-full border border-[#EAEAEA] my-5" />

      {isLoading ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[50vh]">
          <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services?.map((service) => {
              return (
                <div className="w-full bg-[#F4F4F4] rounded-[16px] p-3 flex items-center gap-3">
                  <div>
                    <img
                      src={service.images[0]}
                      alt={`${service?.name} image`}
                      wdith={66}
                      height={66}
                      className="w-[66px] h-[66px] max-w-[66px] max-h-[66px] object-cover rounded-[10px]"
                    />
                  </div>

                  <div className="w-full flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold leading-none text-[15px]">
                        {service?.name}
                      </h4>
                      <p className="text-sm text-[#18181899]">
                        {service?.category}
                      </p>
                    </div>
                    <div className="">rating</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderServices;
