import React, { useEffect } from "react";
import Modal from "../../../../../components/ui/Modal";

const DeclineSuccessModal = ({
  declineSuccessModal,
  setDeclineSuccessModal,
}) => {
  useEffect(() => {
    if (!declineSuccessModal) return;

    const timer = setTimeout(() => {
      setDeclineSuccessModal(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [declineSuccessModal, setDeclineSuccessModal]);

  return (
    <Modal
      icon="/request-declined-icon.png"
      isOpen={declineSuccessModal}
      onClose={() => setDeclineSuccessModal(false)}
      height={106}
      width={106}
      title="Request Declined"
      description="The request has been declined successfully."
    />
  );
};

export default DeclineSuccessModal;
