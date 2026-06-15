import React from "react";
import ServiceLayout from "./components/ServiceLayout";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";
import { useGetServiceQuery } from "../../../../services/serviceApi/serviceApi";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/ui/loader/Loader";

const EditServicePage = () => {
  const { id } = useParams();
  useUpdateTitle("Edit Service");
  const { data, error, isLoading } = useGetServiceQuery(id);
  const service = data?.data;

  return (
    <div className="min-h-screen text-gray-900 py-10">
      {isLoading ? (
        <div className="w-full bg-white pt-20 rounded-3xl min-h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <ServiceLayout service={service} />
        </div>
      )}
    </div>
  );
};

export default EditServicePage;
