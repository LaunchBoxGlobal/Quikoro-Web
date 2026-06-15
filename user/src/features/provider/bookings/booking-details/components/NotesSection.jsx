export default function NotesSection({ booking }) {
  return (
    <div>
      <div className="mb-2 text-[14px] text-gray-500">Notes</div>

      <p className="text-[15px] leading-relaxed text-gray-800">
        {booking?.additionalNotes}
      </p>
    </div>
  );
}
