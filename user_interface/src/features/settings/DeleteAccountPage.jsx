import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import OTPModal from "./OTPModal";
import { CheckIcon } from "../../assets/export";
import { useRequestOtpMutation } from "../../services/settingsApi/settingsApi";

export default function DeleteAccountPage() {
  const [openOtpModal, setOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const user = useSelector((state) => state.user.user);

  const [requestOtp, { isLoading }] = useRequestOtpMutation();

  const handleToggleOtpModal = async () => {
    try {
      await requestOtp().unwrap();
      setOtpModal(true);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong.",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
    }
  };

  useEffect(() => {
    if (!showSuccessModal) return;

    const timer = setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  return (
    <>
      <div className="w-full">
        <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight mb-5 leading-none">
          Delete Account
        </h2>

        <div className="w-full mt-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold leading-none">
              We will send a 6-digit code to {user?.email}
            </p>

            <p className="font-normal leading-none text-[#565656] mt-2">
              Your data will be removed from our database permanently.
            </p>
          </div>

          <div className="w-full max-w-[152px]">
            <Button
              type="button"
              text="Send"
              isLoading={isLoading}
              loader="Sending..."
              onclick={handleToggleOtpModal}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={openOtpModal} onClose={() => setOtpModal(false)}>
        <OTPModal
          user={user}
          setOtpModal={setOtpModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        icon={"/check-icon.png"}
        title="Account Deleted"
        description="Your account has been deleted successfully!"
      />
    </>
  );
}
