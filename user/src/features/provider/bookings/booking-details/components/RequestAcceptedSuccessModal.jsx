import React from "react";
import Modal from "../../../../../components/ui/Modal";

const RequestAcceptedSuccessModal = ({ isOpen, setIsOpen, refetch }) => {
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
        title={`Request Accepted`}
        description={`Your booking request has been accepted your job has been started.`}
      />
    </>
  );
};

export default RequestAcceptedSuccessModal;
