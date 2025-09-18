"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const StarRating = ({ rating, totalStars = 5 }: { rating: number, totalStars?: number }) => (
  <div className="flex items-center">
    {[...Array(totalStars)].map((_, i) => (
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
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
      <div className="flex items-center gap-3">
        <Image src="/google-logo.svg" alt="Google" width={24} height={24} />
        <div>
          <div className="flex items-center gap-2">
            <StarRating rating={4.9} />
            <span className="font-bold text-lg">4.9/5</span>
          </div>
          <p className="text-xs text-white/70">Gebaseerd op 1200+ reviews</p>
        </div>
      </div>
      <div className="hidden sm:block h-10 w-px bg-white/20"></div>
      <div className="flex items-center gap-3">
        <Image src="/facebook-logo.svg" alt="Facebook" width={24} height={24} />
        <div>
          <div className="flex items-center gap-2">
            <StarRating rating={4.8} />
            <span className="font-bold text-lg">4.8/5</span>
          </div>
          <p className="text-xs text-white/70">Gebaseerd op 500+ reviews</p>
        </div>
      </div>
    </div>
  );
}