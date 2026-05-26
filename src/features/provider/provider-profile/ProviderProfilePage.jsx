import { Bell } from "lucide-react";
import BackButton from "./components/BackButton";
import ProfileCard from "./components/ProfileCard";
import ProviderDetails from "./components/ProviderDetails";
import EditProfileModal from "./edit-profile/EditProfileModal";
import { useState } from "react";
import useUpdateTitle from "../../../hooks/useUpdateTitle";
import { useGetUserProfileQuery } from "../../../services/userService/userApi";
import Loader from "../../../components/ui/loader/Loader";
import { useSelector } from "react-redux";
import CustomerEditProfileModal from "./edit-profile/CustomerEditProfileModal";
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

export default function ProviderProfilePage() {
  useUpdateTitle("Profile");
  const user = useSelector((state) => state.user.user);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openCustomerEditProfileModal, setOpenCustomerEditProfileModal] =
    useState(false);
  const { data, isLoading, isError, refetch } = useGetUserProfileQuery();
  const profile = data?.data;

  const handleToggleModal = () => {
    if (user?.role === "CUSTOMER") {
      setOpenCustomerEditProfileModal(true);
    } else {
      setOpenEditProfileModal(true);
    }
  };
  return (
    <div className="relative">
      <BackButton />

      {isLoading ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center bg-white">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <div className="w-full min-h-screen">
              <div className="w-full bg-white rounded-3xl min-h-[60vh] flex items-center justify-center gap-2 px-5">
                <BiError className="secondary-text" size={22} />
                <p className="secondary-text font-medium">
                  Something went wrong.
                </p>
              </div>
            </div>
          ) : (
            <>
              <ProfileCard
                setOpenEditProfileModal={setOpenEditProfileModal}
                profile={profile}
                handleToggleModal={handleToggleModal}
              />

              <ProviderDetails details={details} profile={profile} />
            </>
          )}
        </>
      )}
      {openEditProfileModal && (
        <EditProfileModal
          isOpen={openEditProfileModal}
          onClose={() => setOpenEditProfileModal(false)}
          profile={profile}
          refetch={refetch}
        />
      )}

      {openCustomerEditProfileModal && (
        <CustomerEditProfileModal
          isOpen={openCustomerEditProfileModal}
          onClose={() => setOpenCustomerEditProfileModal(false)}
          profile={profile}
          refetch={refetch}
        />
      )}
    </div>
  );
}
