import React, { useState } from "react";
import ServiceHeader from "./components/ServiceHeader";
import ServiceHero from "./components/ServiceHero";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";
import { useParams } from "react-router-dom";
import { useGetServiceQuery } from "../../../../services/serviceApi/serviceApi";
import { useSelector } from "react-redux";
import BookServiceModal from "./components/BookServiceModal";
import Loader from "../../../../components/ui/loader/Loader";

export default function ServiceDetails() {
  const { id } = useParams();
  useUpdateTitle("Service Details");
  const { data, error, isLoading } = useGetServiceQuery(id);
  const service = data?.data;
  const [openBookingModal, setOpenBookingModal] = useState(false);

  const user = useSelector((state) => state.user);

  const reviews = Array(3).fill({
    name: "Mike Smith",
    rating: 4.5,
    text: "The standard Lorem Ipsum passage, used since the Lorem ipsum dolor sit sed do eiusmod The standard Lorem Ipsum passage, used since the Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. tempor incididunt ut labore et dolore magna aliqua.",
  });

  return (
    <>
      <div className="min-h-screen w-full text-gray-900">
        <div className="mx-auto">
          <ServiceHeader
            service={service}
            setOpenBookingModal={setOpenBookingModal}
          />

          {isLoading ? (
            <div className="w-full min-h-[50vh] flex items-center justify-center bg-white">
              <Loader />
            </div>
          ) : (
            <ServiceHero reviews={reviews} service={service} />
          )}
        </div>
      </div>
      {openBookingModal && (
        <BookServiceModal
          service={service}
          setOpenBookingModal={setOpenBookingModal}
          onClose={() => setOpenBookingModal(false)}
        />
      )}
    </>
  );
}
