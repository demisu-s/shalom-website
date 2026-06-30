'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onError?: () => void;
}

export default function ImageSkeleton({ 
  src, 
  alt, 
  fill = true, 
  className = '',
  sizes,
  priority = false,
  onError 
}: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A84C]/5 to-transparent animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }} />
        </div>
      )}
      
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={`transition-opacity duration-500 ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes={sizes}
          priority={priority}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
            if (onError) onError();
          }}
        />
      ) : (
        <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
          <span className="text-6xl">📷</span>
        </div>
      )}
    </div>
  );
}
