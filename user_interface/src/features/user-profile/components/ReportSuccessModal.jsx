import React, { useEffect } from "react";
import Modal from "../../../components/ui/Modal";

const ReportSuccessModal = ({ isOpen, setShowReportSuccessModal }) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setShowReportSuccessModal(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, setShowReportSuccessModal]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setShowReportSuccessModal(false)}
      icon={"/user-report-icon.png"}
      width={106}
      height={106}
      title={"User Reported"}
      description={
        "Thank you for bringing this to our attention. Our team will review your report and get back to you shortly."
      }
    />
  );
};

export default ReportSuccessModal;
