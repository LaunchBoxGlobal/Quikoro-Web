import React from "react";

const AverageRating = ({ reviews = [], size = 16 }) => {
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Rating is out of 5
  const fillPercentage = (average / 5) * 100;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        {/* Empty Star */}
        <svg viewBox="0 0 24 24" width={size} height={size} fill="#d1d5db">
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.416 24 12 20.017 4.584 24 6 15.597 0 9.75l8.332-1.595z" />
        </svg>

        {/* Filled Star */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${fillPercentage}%`,
            overflow: "hidden",
            height: "100%",
          }}
        >
          <svg viewBox="0 0 24 24" width={size} height={size} fill="#facc15">
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.416 24 12 20.017 4.584 24 6 15.597 0 9.75l8.332-1.595z" />
          </svg>
        </div>
      </div>

      <span style={{ fontWeight: 600 }} className="text-sm">
        {average.toFixed(1)}
      </span>

      <span style={{ color: "#6b7280" }} className="text-sm">
        ({reviews.length})
      </span>
    </div>
  );
};

export default AverageRating;
