"use client";

import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export function TrustBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90">
      <div className="flex items-center gap-2">
        <StarRating rating={4.9} />
        <span className="font-semibold">4.9/5.0</span>
        <span className="text-white/70">(1200+ Google Reviews)</span>
      </div>
      <div className="hidden sm:block h-6 w-px bg-white/30"></div>
      <div className="flex items-center gap-2">
        <StarRating rating={4.8} />
        <span className="font-semibold">4.8/5.0</span>
        <span className="text-white/70">(Facebook Reviews)</span>
      </div>
    </div>
  );
}