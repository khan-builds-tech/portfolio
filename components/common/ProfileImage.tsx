"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfileImage() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check if image exists
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = "/images/profile.jpg";
  }, []);

  if (imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center rounded-full">
        <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">AK</span>
      </div>
    );
  }

  return (
    <Image
      src="/images/profile.jpg"
      alt="Aman Khan"
      fill
      sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
      className="object-cover"
      priority
      quality={95}
      onError={() => setImageError(true)}
      onLoad={() => setImageLoaded(true)}
    />
  );
}

