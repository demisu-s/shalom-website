'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={headerRef} 
      className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {badge && (
        <span className="inline-block text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-3 animate-fade-in">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#999999] text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
