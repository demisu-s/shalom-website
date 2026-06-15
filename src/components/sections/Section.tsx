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
      className={`py-16 lg:py-24 bg-[#111111] border-y border-[#2A2A2A] ${className}`}
    >
      {children}
    </section>
  );
}