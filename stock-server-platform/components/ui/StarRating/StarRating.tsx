interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5">
          <svg viewBox="0 0 24 24" fill={star <= rating ? "currentColor" : "none"} stroke={star > rating ? "currentColor" : "none"} strokeWidth="2" className={star <= rating ? "text-[#17e2fe]" : "text-gray-300"}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
