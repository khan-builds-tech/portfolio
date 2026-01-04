"use client";

import { motion } from "framer-motion";
import { Youtube, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  url: string;
  title?: string;
  thumbnailUrl?: string;
  isLoading?: boolean;
}

const videoUrls = [
  "https://www.youtube.com/watch?v=mta3ynGk-U0",
  "https://www.youtube.com/watch?v=ZyujOrDFyVc",
];

export default function KnowledgeSharingSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true);
      const videoPromises = videoUrls.map(async (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0] || '';
        try {
          const response = await fetch(`/api/youtube?url=${encodeURIComponent(url)}`);
          if (response.ok) {
            const data = await response.json();
            return {
              id: videoId,
              url,
              title: data.title,
              thumbnailUrl: data.thumbnailUrl,
              isLoading: false,
            };
          }
        } catch (error) {
          console.error(`Error fetching video ${videoId}:`, error);
        }
        // Fallback if API fails
        return {
          id: videoId,
          url,
          title: `Video ${videoId}`,
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          isLoading: false,
        };
      });

      const videoData = await Promise.all(videoPromises);
      setVideos(videoData);
      setIsLoading(false);
    };

    fetchVideoData();
  }, []);

  return (
    <section id="knowledge-sharing" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 scroll-mt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-400/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Youtube className="w-6 h-6 md:w-8 md:h-8 text-red-600 dark:text-red-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 dark:from-red-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Knowledge Sharing
            </h2>
            <Youtube className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4 max-w-2xl mx-auto">
            Sharing insights and knowledge through video content
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-red-600 dark:text-red-400" />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {videos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  const thumbnailUrl = video.thumbnailUrl || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={thumbnailUrl}
          alt={video.title || `YouTube video ${video.id}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault fails
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackThumbnailUrl) {
              target.src = fallbackThumbnailUrl;
            }
          }}
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* YouTube Badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
          <Youtube className="w-3 h-3" />
          YouTube
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
          {video.title || `Video ${video.id}`}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ExternalLink className="w-4 h-4" />
          <span>Watch on YouTube</span>
        </div>
      </div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-red-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none"></div>
    </motion.a>
  );
}
