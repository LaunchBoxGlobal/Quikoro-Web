import useUpdateTitle from "../../../hooks/useUpdateTitle";
import { statuses } from "./booking";
import BookingSection from "./components/BookingSection";

export default function MyBookingsPage() {
  useUpdateTitle("Booking History");

  return (
    <main className="w-full min-h-screen">
      <BookingSection />
    </main>
  );
}
