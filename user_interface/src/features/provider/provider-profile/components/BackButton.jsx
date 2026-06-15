import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[17px] font-bold text-gray-900 hover:opacity-80"
      >
        <ChevronLeft size={20} strokeWidth={3} />
        Back
      </button>
    </div>
  );
}
