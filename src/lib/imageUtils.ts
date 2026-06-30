// lib/imageUtils.ts

/**
 * Get optimized image path
 * @param imagePath - Original image path
 * @returns Optimized image path
 */
export function getOptimizedImagePath(imagePath: string): string {
  // Remove leading slash if exists
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Check if it's already using optimized path
  if (cleanPath.includes('optimized/')) {
    return imagePath;
  }
  
  // Convert to optimized path
  const filename = cleanPath.split('/').pop();
  if (!filename) return imagePath;
  
  return `/images/optimized/${filename}`;
}

/**
 * Get image dimensions based on usage
 */
export function getImageDimensions(usage: 'thumbnail' | 'portfolio' | 'hero' | 'team') {
  const dimensions = {
    thumbnail: { width: 400, height: 300 },
    portfolio: { width: 800, height: 600 },
    hero: { width: 600, height: 600 },
    team: { width: 400, height: 400 },
  };
  
  return dimensions[usage] || dimensions.portfolio;
}

/**
 * Get image optimization quality
 */
export function getImageQuality(usage: 'thumbnail' | 'portfolio' | 'hero' | 'team') {
  const qualities = {
    thumbnail: 75,
    portfolio: 80,
    hero: 90,
    team: 85,
  };
  
  return qualities[usage] || 80;
}

/**
 * Check if image exists in optimized folder
 * Note: This is a client-side check, use with caution
 */
export async function checkOptimizedImageExists(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get fallback image path
 */
export function getFallbackImagePath(category?: string): string {
  const fallbacks: Record<string, string> = {
    events: '/images/optimized/fallback-event.jpg',
    printing: '/images/optimized/fallback-printing.jpg',
    advertising: '/images/optimized/fallback-advertising.jpg',
    branding: '/images/optimized/fallback-branding.jpg',
  };
  
  return category && fallbacks[category] 
    ? fallbacks[category] 
    : '/images/optimized/fallback.jpg';
}