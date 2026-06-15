import { useSelector } from "react-redux";
import Button from "../../../../../components/ui/Button";

export default function ServiceHeader({ setOpenBookingModal }) {
  const user = useSelector((state) => state.user);
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="text-[32px] font-bold tracking-tight">Service Details</h1>
      {user && user?.user?.role === "CUSTOMER" && (
        <div className="w-full max-w-[192px]">
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
