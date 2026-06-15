import React, { useState } from "react";
import ServiceHeader from "./components/ServiceHeader";
import ServiceHero from "./components/ServiceHero";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";
import { Link, useParams } from "react-router-dom";
import { useGetServiceQuery } from "../../../../services/serviceApi/serviceApi";
import { useSelector } from "react-redux";
import BookServiceModal from "./components/BookServiceModal";
import Loader from "../../../../components/ui/loader/Loader";
import Modal from "../../../../components/ui/Modal";

export default function ServiceDetails() {
  const { id } = useParams();
  useUpdateTitle("Service Details");
  const { data, error, isLoading } = useGetServiceQuery(id);
  const service = data?.data;
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="min-h-screen w-full text-gray-900">
        <div className="mx-auto">
          <ServiceHeader
            service={service}
            setOpenBookingModal={setOpenBookingModal}
          />

          {isLoading ? (
            <div className="w-full min-h-[50vh] rounded-3xl pt-20 flex items-center justify-center bg-white">
              <Loader />
            </div>
          ) : (
            <ServiceHero service={service} />
          )}
        </div>
      </div>
      {openBookingModal && (
        <BookServiceModal
          service={service}
          setOpenBookingModal={setOpenBookingModal}
          onClose={() => setOpenBookingModal(false)}
          setBookingSuccess={setBookingSuccess}
          setBookingDetails={setBookingDetails}
        />
      )}

      <Modal
        icon={`/check-icon.png`}
        width={106}
        height={106}
        title={"Request Sent"}
        description={`Your booking request has been sent to ${service?.provider?.fullName}. You'll be notified when they respond.`}
        isOpen={bookingSuccess}
        onClose={() => setBookingSuccess(false)}
        footer={
          <div className="w-full">
            <Link
              to={`/booking-history/${bookingDetails?.id}`}
              className="primary-button"
            >
              View Details
            </Link>

            <div className="w-full text-center pt-5">
              <Link to={"/"} className="text-sm font-medium">
                Browse More
              </Link>
            </div>
          </div>
        }
      />
    </>
  );
}
