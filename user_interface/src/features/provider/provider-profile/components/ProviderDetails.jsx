import { useSelector } from "react-redux";
import DetailsRow from "./DetailsRow";

export default function ProviderDetails({ details, profile }) {
  const user = useSelector((state) => state.user.user);
  const userAddress = [
    profile?.streetAddress,
    profile?.zipCode,
    profile?.city,
    profile?.state,
    profile?.country,
  ]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="mb-16 rounded-[1.5rem] foreground p-8 lg:p-10">
      <h2 className="mb-6 text-[22px] font-bold tracking-tight text-gray-900">
        Provider Details
      </h2>
      <div className="border border-gray-200 w-full" />

      <div className="flex flex-col">
        {/* email */}
        <div className="py-5">
          <div className="mb-1.5 text-[13px] text-gray-500">Email</div>
          <div className="text-[15px] font-medium text-gray-900">
            {profile?.email || "N/A"}
          </div>
        </div>
        <div className="border border-gray-200 w-full" />

        {/* phone number */}
        {profile?.phoneNumber && (
          <>
            <div className="py-5">
              <div className="mb-1.5 text-[13px] text-gray-500">
                Phone Number
              </div>
              <div className="text-[15px] font-medium text-gray-900">
                {profile?.phoneNumber || "N/A"}
              </div>
            </div>
            <div className="border border-gray-200 w-full" />
          </>
        )}

        {/* Speciality */}
        {user && user?.role === "PROVIDER" && (
          <>
            <div className="py-5">
              <div className="mb-1.5 text-[13px] text-gray-500">Speciality</div>
              <div className="text-[15px] font-medium text-gray-900">
                {profile?.speciality || "N/A"}
              </div>
            </div>
            <div className="border border-gray-200 w-full" />
          </>
        )}

        {/* Experience */}
        {user && user?.role === "PROVIDER" && (
          <>
            <div className="py-5">
              <div className="mb-1.5 text-[13px] text-gray-500">Experience</div>
              <div className="text-[15px] font-medium text-gray-900">
                {profile?.yearsOfExperience || "N/A"}
              </div>
            </div>
            <div className="border border-gray-200 w-full" />
          </>
        )}

        {/* Location */}
        {userAddress && (
          <>
            <div className="py-5">
              <div className="mb-1.5 text-[13px] text-gray-500">Location</div>
              <div className="text-[15px] font-medium text-gray-900">
                {userAddress || "N/A"}
              </div>
            </div>
            <div className="border border-gray-200 w-full" />
          </>
        )}

        {/* Description */}
        {profile?.description && (
          <div className="py-5">
            <div className="flex items-center justify-between mb-1.5 text-[13px]">
              <span className="text-gray-500">About</span>
              {/* <span className="text-gray-900 font-medium">20 Miles Away</span> */}
            </div>

            <div className="text-[15px] font-medium text-gray-900 leading-relaxed pt-1">
              {profile?.description || "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
