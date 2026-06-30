'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Star } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/5 blur-3xl animate-pulse-slow" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/3 blur-3xl animate-float-slow" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className={`transition-all duration-1000 transform ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/5 rounded-full px-4 py-2 mb-8 animate-slide-down">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star 
                    key={i} 
                    size={12} 
                    className="fill-[#C9A84C] text-[#C9A84C] animate-twinkle" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-[#C9A84C] font-medium">Ethiopia&apos;s #1 Event Organizer</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] text-white mb-6">
              <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Where Every
              </span>
              <span className="gold-text block animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Event Becomes
              </span>
              <span className="text-white block animate-slide-up" style={{ animationDelay: '0.5s' }}>
                a Masterpiece
              </span>
            </h1>

            <p className="text-[#999999] text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-in" style={{ animationDelay: '0.7s' }}>
              From breathtaking weddings to powerhouse corporate events — Shalom delivers unforgettable experiences paired with premium printing and advertising that elevates your brand.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Link href="/services" className="btn-gold inline-flex items-center gap-2 group">
                Explore Services
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/portfolio" className="btn-outline-gold inline-flex items-center gap-2 group">
                <Play size={16} className="fill-current transition-transform duration-300 group-hover:scale-110" />
                View Our Work
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-[#2A2A2A]">
              {[
                { value: '500+', label: 'Events Organized' },
                { value: '300+', label: 'Happy Clients' },
                { value: '15+', label: 'Years Experience' },
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="animate-scale-in"
                  style={{ animationDelay: `${1.1 + index * 0.15}s` }}
                >
                  <p className="text-2xl font-bold gold-text">{stat.value}</p>
                  <p className="text-xs text-[#666666] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Logo showcase */}
          <div className={`relative flex items-center justify-center transition-all duration-1000 transform ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`} style={{ transitionDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full border border-[#C9A84C]/20 animate-pulse-slow" style={{ transform: 'scale(1.2)' }} />
              <div className="absolute inset-0 rounded-full border border-[#C9A84C]/10 animate-spin-slow" style={{ transform: 'scale(1.4)' }} />
              <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 blur-2xl animate-pulse-glow" style={{ transform: 'scale(1.3)' }} />

              <div className="relative w-72 h-72 md:w-96 md:h-96 float-animate">
                <Image
                  src="/images/optimized/logo.png"
                  alt="Shalom Advertising & Event Organizer"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
            </div>

            <div className="absolute top-8 -left-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 shadow-xl animate-float-badge" style={{ animationDelay: '0.5s' }}>
              <p className="text-xs text-[#C9A84C] font-bold">💍 Wedding Events</p>
            </div>
            <div className="absolute bottom-8 -left-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 shadow-xl animate-float-badge" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs text-[#C9A84C] font-bold">🖨️ Print Services</p>
            </div>
            <div className="absolute top-8 -right-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 shadow-xl animate-float-badge" style={{ animationDelay: '0.6s' }}>
              <p className="text-xs text-[#C9A84C] font-bold">📣 Advertising</p>
            </div>
            <div className="absolute bottom-8 -right-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 shadow-xl animate-float-badge" style={{ animationDelay: '0.9s' }}>
              <p className="text-xs text-[#C9A84C] font-bold">🏢 Corporate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
