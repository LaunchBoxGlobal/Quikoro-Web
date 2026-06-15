import { X } from "lucide-react";
import { PendingAccountMockup } from "../../assets/export";

export default function AccountStatusPage() {
  return (
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
