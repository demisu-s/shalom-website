import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      className={`py-16 lg:py-24 bg-[#111111] relative ${className}`}
    >
      {/* Top border - minimal elegant line */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="relative w-4/5 max-w-3xl">
          {/* Main line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
          
          {/* Gold accent at center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-gold shadow-lg shadow-gold/40" />
          </div>
        </div>
      </div>

      {/* Bottom border - minimal elegant line */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="relative w-4/5 max-w-3xl">
          {/* Main line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
          
          {/* Gold accent at center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-gold shadow-lg shadow-gold/40" />
          </div>
        </div>
      </div>

      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gold/5 blur-sm" />

      {children}
    </section>
  );
}