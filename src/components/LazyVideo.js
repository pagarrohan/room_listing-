import React, { useState, useEffect, useRef } from 'react';
import { Eye, AlertCircle } from 'lucide-react';

// Lazy video component with intersection observer
const LazyVideo = React.memo(({ src, className }) => {
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsPlaying(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              // Auto-play failed, which is expected in many browsers
            });
          }
        } else {
          setIsPlaying(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <Eye className="w-8 h-8 text-gray-400" />
          <span className="ml-2 text-gray-500">Video loads when visible</span>
        </div>
      )}
      {isInView && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-lg"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-gray-400" />
            <span className="ml-2 text-gray-500">Video not supported</span>
          </div>
        </video>
      )}
    </div>
  );
});

export default LazyVideo;