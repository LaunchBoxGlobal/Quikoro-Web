import React from "react";
import Modal from "../../../../../components/ui/Modal";

const RequestAcceptedSuccessModal = ({
  isOpen,
  setIsOpen,
  refetch,
  title,
  description,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          refetch();
        }}
        icon={"/accept-request-icon.png"}
        width={106}
        height={106}
        title={title || `Request Accepted`}
        description={
          description ||
          `Your request has been sent. You'll be notified when they respond.`
        }
      />
    </>
  );
};

export default RequestAcceptedSuccessModal;
