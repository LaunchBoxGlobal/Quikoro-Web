import { useSelector } from "react-redux";
import Button from "../../../../../components/ui/Button";
import SectionTitle from "../../../../../components/ui/SectionTitle";

export default function ServiceHeader({ setOpenBookingModal }) {
  const user = useSelector((state) => state.user);
  return (
    <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
      <SectionTitle>Service Details</SectionTitle>
      {user && user?.user?.role === "CUSTOMER" && (
        <div className="w-auto lg:w-[192px]">
          <Button
            type="button"
            text={`Book Slot`}
            isLoading={false}
            onclick={() => setOpenBookingModal(true)}
          />
        </div>
      )}
    </div>
  );
}
