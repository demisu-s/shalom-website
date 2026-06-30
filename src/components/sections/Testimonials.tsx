'use client';

import { useState, useEffect } from 'react';
import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import StarRating from '../ui/StarRating';
import { testimonials } from '@/data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <Section className="bg-[#0A0A0A] overflow-hidden">
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the clients who have experienced the Shalom difference."
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="relative gold-card rounded-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/5">
            {/* Quote icon */}
            <div className="absolute top-4 left-4 text-6xl text-[#C9A84C]/10 font-serif">&quot;</div>
            
            <div className={`transition-all duration-500 transform ${
              isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}>
              <div className="flex justify-center mb-6">
                <StarRating rating={currentTestimonial?.rating || 5} size={20} />
              </div>
              
              <p className="text-lg md:text-xl text-center text-[#E5E5E5] leading-relaxed mb-8 animate-fade-in">
                &ldquo;{currentTestimonial?.content}&rdquo;
              </p>
              
              <div className="text-center">
                <h4 className="text-white font-semibold text-lg transition-colors duration-300 hover:text-[#C9A84C]">
                  {currentTestimonial?.name}
                </h4>
                <p className="text-[#C9A84C] text-sm">
                  {currentTestimonial?.role}, {currentTestimonial?.company}
                </p>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(idx);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-8 h-2.5 rounded-full bg-[#C9A84C] shadow-lg shadow-[#C9A84C]/25' 
                    : 'w-2 h-2 rounded-full bg-[#444444] hover:bg-[#666666]'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
