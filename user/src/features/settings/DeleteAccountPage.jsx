import { ImageIcon } from "lucide-react";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import { CheckIcon, CloseButtonIcon } from "../../assets/export";
import OTPModal from "./OTPModal";
import { useSelector } from "react-redux";
import { useRequestOtpMutation } from "../../services/settingsApi/settingsApi";
import { enqueueSnackbar } from "notistack";

export default function DeleteAccountPage() {
  const [openOtpModal, setOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [requestOtp, { isLoading, error }] = useRequestOtpMutation();

  const toggleSuccessModal = () => setShowSuccessModal((prev) => !prev);

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
    // setOtpModal((prev) => !prev);
    // if (openOtpModal) {
    //   toggleSuccessModal();
    // }
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
        <h2 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight mb-5 leading-none">
          Delete Account
        </h2>

        <div className="w-full mt-8 flex items-center justify-between flex-wrap gap-4">
          <div className="">
            <p className="font-medium leading-none">
              We will send 6 digits code to {user?.email && user?.email}
            </p>
            <p className="font-medium leading-none text-[#565656] mt-2">
              Your data will be removed from our database permanently.
            </p>
          </div>
          <div className="w-full max-w-[152px]">
            <Button
              type="button"
              text={`Send`}
              isLoading={isLoading}
              loader="Sending..."
              onclick={() => handleToggleOtpModal()}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openOtpModal}
        onClose={() => {
          setOtpModal(false);
        }}
        children={
          <OTPModal
            setShowSuccessModal={setShowSuccessModal}
            setOtpModal={setOtpModal}
            user={user}
          />
        }
      />

      <Modal
        isOpen={showSuccessModal}
        icon={CheckIcon}
        title={`Account Deleted`}
        description={`Your account has been deleted successfully!`}
      />
    </>
  );
}
