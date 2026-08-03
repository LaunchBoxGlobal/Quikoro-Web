import { Star } from "lucide-react";

export default function StarRating({ rating = 0, size = 18, className = "" }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        // Full star
        if (rating >= starValue) {
          return (
            <Star
              key={index}
              size={size}
              fill="#FACC15"
              stroke="#FACC15"
              className={className}
            />
          );
        }

        // Half star
        if (rating >= starValue - 0.5) {
          return (
            <div
              key={index}
              className="relative"
              style={{ width: size, height: size }}
            >
              {/* Gray background */}
              <Star
                size={size}
                fill="#E5E7EB"
                stroke="#E5E7EB"
                className="absolute inset-0"
              />

              {/* Gold half */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <Star size={size} fill="#FACC15" stroke="#FACC15" />
              </div>
            </div>
          );
        }

        // Empty star
        return (
          <Star
            key={index}
            size={size}
            fill="#E5E7EB"
            stroke="#E5E7EB"
            className={className}
          />
        );
      })}
    </div>
  );
}
