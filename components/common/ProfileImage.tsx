"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfileImage() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use external image service URL from environment variable, or fallback to local
  // Set NEXT_PUBLIC_PROFILE_IMAGE_URL in .env.local to use external hosting
  // Examples:
  // - Cloudinary: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/profile.jpg
  // - Vercel Blob: https://[hash].public.blob.vercel-storage.com/profile-[hash].jpeg
  // - Imgur: https://i.imgur.com/your-image-id.jpg
  // - GitHub: https://raw.githubusercontent.com/USERNAME/REPO/main/profile.jpeg
  const [imageSrc, setImageSrc] = useState<string>(
    process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL || "/images/profile.jpeg"
  );

  useEffect(() => {
    // Check if image exists
    const img = new window.Image();
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      // If external URL fails, try local fallback
      if (imageSrc !== "/images/profile.jpeg") {
        setImageSrc("/images/profile.jpeg");
        img.src = "/images/profile.jpeg";
      } else {
        setImageError(true);
      }
    };
    
    img.src = imageSrc;
  }, [imageSrc]);

  if (imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center rounded-full">
        <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">AK</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt="Aman Khan"
      fill
      sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 420px, 500px"
      className="object-cover"
      priority
      quality={95}
      onError={() => setImageError(true)}
      onLoad={() => setImageLoaded(true)}
    />
  );
}

