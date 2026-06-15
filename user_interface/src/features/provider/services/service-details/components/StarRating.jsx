import { Star } from "lucide-react";

export default function StarRating({ rating = 5, size = 18, className = "" }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill="currentColor"
          strokeWidth={0}
          className={className}
        />
      ))}
    </div>
  );
}
