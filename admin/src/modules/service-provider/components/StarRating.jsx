import { Star } from "lucide-react";

export default function StarRating({ rating = 5, size = 18, className = "" }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "#FACC15" : "transparent"} // yellow-400
          stroke={i < rating ? "#FACC15" : "#D1D5DB"} // gray-300
          strokeWidth={1.8}
          className={className}
        />
      ))}
    </div>
  );
}
