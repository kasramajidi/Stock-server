import React from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating = React.memo<StarRatingProps>(({ rating, onRatingChange }) => (
  <div className="flex gap-1 justify-start">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onRatingChange(star)}
        className={`text-2xl transition-colors ${
          star <= rating
            ? "text-yellow-400"
            : "text-gray-300 hover:text-yellow-400"
        }`}
      >
        {star <= rating ? "★" : "☆"}
      </button>
    ))}
  </div>
));

StarRating.displayName = "StarRating";

export default StarRating;
