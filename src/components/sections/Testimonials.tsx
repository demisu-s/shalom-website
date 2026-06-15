'use client';

import { useState } from 'react';
import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import StarRating from '../ui/StarRating';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section>
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the clients who have experienced the Shalom difference."
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="gold-card rounded-2xl p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <StarRating rating={testimonials[activeIndex]?.rating || 5} size={20} />
            </div>
            <p className="text-lg md:text-xl text-center text-[#E5E5E5] leading-relaxed mb-8">
              &ldquo;{testimonials[activeIndex]?.content}&rdquo;
            </p>
            <div className="text-center">
              <h4 className="text-white font-semibold text-lg">{testimonials[activeIndex]?.name}</h4>
              <p className="text-[#C9A84C] text-sm">
                {testimonials[activeIndex]?.role}, {testimonials[activeIndex]?.company}
              </p>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-[#C9A84C]' : 'bg-[#444444] hover:bg-[#666666]'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}