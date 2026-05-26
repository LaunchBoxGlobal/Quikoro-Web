import { Bell } from "lucide-react";
import BackButton from "../provider/provider-profile/components/BackButton";
import ProfileCard from "./components/ProfileCard";
import ProviderDetails from "../provider/provider-profile/components/ProviderDetails";
import { useState } from "react";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import {
  useGetUserProfileByIdQuery,
  useGetUserProfileQuery,
} from "../../services/userService/userApi";
import Loader from "../../components/ui/loader/Loader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlockConfirmation from "./components/BlockConfirmation";
import BlockSuccess from "./components/BlockSuccess";
import { BiError } from "react-icons/bi";

export const details = [
  { label: "Full Name", value: "John Doe" },
  { label: "Email Address", value: "johndoe@gmail.com" },
  { label: "Phone number", value: "+000 0000 000" },
  { label: "Age", value: "25yrs old" },
  { label: "Gender", value: "Male" },
  {
    label: "Location",
    value: "Dallas, TX – 802 PainEase Plaza",
  },
  {
    label: "Experience",
    value: "9 years of experience",
  },
];

export default function UserProfilePage() {
  useUpdateTitle("Profile");
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [blockConfirmation, setBlockConfirmation] = useState(false);

  const { data, isLoading, isError, refetch } = useGetUserProfileByIdQuery(id);
  const profile = data?.data;

  return (
    <>
      <div className="relative">
        <BackButton />

        {isLoading ? (
          <div className="w-full min-h-[50vh] rounded-3xl flex items-center justify-center bg-white">
            <Loader />
          </div>
        ) : (
          <>
            {isError ? (
              <div className="w-full min-h-screen">
                <div className="w-full min-h-[50vh] flex items-center justify-center gap-2 bg-white rounded-3xl">
                  <BiError className="secondary-text" size={22} />
                  <p className="secondary-text font-medium">
                    Something went wrong.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <ProfileCard
                  profile={profile}
                  setBlockConfirmation={setBlockConfirmation}
                />

                <ProviderDetails details={details} profile={profile} />
              </>
            )}
          </>
        )}
      </div>

      <BlockConfirmation
        isOpen={blockConfirmation}
        refetch={refetch}
        onClose={() => setBlockConfirmation(false)}
      />
      {/* <BlockSuccess /> */}
    </>
  );
}
