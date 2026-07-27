import { X } from "lucide-react";
import { PendingAccountMockup } from "../../assets/export";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserProfileQuery } from "../../services/userService/userApi";
import Loader from "../../components/ui/loader/Loader";
import { setUser } from "../../services/userService/userSlice";

export default function AccountStatusPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { data, isLoading } = useGetUserProfileQuery();

  if (isLoading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  console.log(data?.data);

  dispatch(setUser(data?.data));

  return user?.accountStatus === "PENDING" ||
    user?.accountStatus === "SUBMITTED" ? (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 antialiased selection:bg-teal-100">
      <div className="relative bg-white rounded-3xl p-10 md:px-14 md:py-12 w-full shadow-[0px_4px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
        <div className="mb-6 w-full flex justify-center">
          <img
            src={PendingAccountMockup}
            alt="PendingAccountMockup"
            width={274}
            height={281}
          />
        </div>

        {/* Typography Content */}
        <h1 className="text-[32px] font-bold text-gray-950 mb-3 tracking-tight">
          Request Submitted
        </h1>

        <p className="text-[#3C3C43D9] text-[18px] leading-[1.6] max-w-[340px]">
          Your profile is currently under review. We'll update you once it's
          approved
        </p>
      </div>
    </div>
  ) : user?.accountStatus === "REJECTED" ? (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 antialiased selection:bg-teal-100 w-full">
      <div className="relative bg-white rounded-3xl py-10 md:py-14 w-full max-w-[60%] shadow-[0px_4px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
        <div className="w-full flex items-start gap-10 px-10 md:px-14">
          <div className="mb-6 w-full max-w-[25%] flex justify-center">
            <img
              src={"/account-rejection-mockup.png"}
              alt="account-rejection-mockup"
              width={274}
              height={281}
            />
          </div>

          <div className="w-full text-start">
            {/* Typography Content */}
            <h1 className="text-[24px] lg:text-[28px] font-bold text-gray-950 mb-4 tracking-tight leading-[1.2]">
              Profile Rejected Action Required to Complete Verification
            </h1>
            <p className="text-[#3C3C43D9] text-base lg:text-[18px] leading-[1.35] max-w-[70%]">
              Your profile has been rejected due to the following reason.
            </p>
          </div>
        </div>

        <div className="w-full border border-gray-50 my-6" />

        <div className="w-full px-10 md:px-14 text-start">
          <p className="text-lg font-semibold mb-2">Rejection Reason:</p>
          <p className="text-[#3C3C43D9] text-[18px] leading-[1.35]">
            {user?.remarks}
          </p>
        </div>

        <Link to={"/complete-profile"} className="font-semibold mt-8 underline">
          Resubmit
        </Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 antialiased selection:bg-teal-100">
      <div className="relative bg-white rounded-3xl p-10 md:px-14 md:py-12 w-full shadow-[0px_4px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center">
        <div className="mb-6 w-full flex justify-center">
          <img
            src={PendingAccountMockup}
            alt="PendingAccountMockup"
            width={274}
            height={281}
          />
        </div>

        {/* Typography Content */}
        <h1 className="text-[32px] font-bold text-gray-950 mb-3 tracking-tight">
          Request Submitted
        </h1>

        <p className="text-[#3C3C43D9] text-[18px] leading-[1.6] max-w-[340px]">
          Your profile is currently under review. We'll update you once it's
          approved
        </p>
      </div>
    </div>
  );
}
