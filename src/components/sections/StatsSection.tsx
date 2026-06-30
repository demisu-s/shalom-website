'use client';

import { useState, useEffect, useRef } from 'react';
import { stats } from '@/data/stats';

export default function StatsSection() {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statIndex = entry.target.getAttribute('data-stat-index');
            if (statIndex && !visibleStats.includes(parseInt(statIndex))) {
              setVisibleStats(prev => [...prev, parseInt(statIndex)]);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const statElements = document.querySelectorAll('[data-stat-index]');
    statElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleStats]);

  return (
    <section ref={sectionRef} className="py-16 bg-[#111111] border-y border-[#2A2A2A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const isVisible = visibleStats.includes(i);

            return (
              <div 
                key={i} 
                data-stat-index={i}
                className={`text-center group transition-all duration-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  animation: `scaleIn 0.6s ease-out ${i * 0.15}s both`
                }}
              >
                <div className="text-4xl md:text-5xl font-black gold-text mb-2 transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-5px]">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-[#999999] text-sm font-medium uppercase tracking-wider transition-colors duration-300 group-hover:text-[#C9A84C]">
                  {stat.label}
                </p>
                <div className="gold-divider mx-auto mt-3 w-8 transition-all duration-300 group-hover:w-12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
