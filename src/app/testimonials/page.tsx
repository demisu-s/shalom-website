'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import StarRating from '@/components/ui/StarRating';
import { testimonials } from '@/data/testimonials';
import { Quote, Send, Star, Calendar, User, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    rating: 5,
    testimonial: '',
  });
  const [showForm, setShowForm] = useState(false);
  const testimonialsPerPage = 6;

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const startIndex = currentPage * testimonialsPerPage;
  const endIndex = startIndex + testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  // Added the missing handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Thank you for your testimonial! It will be reviewed and published soon.');
        setFormData({ name: '', email: '', company: '', rating: 5, testimonial: '' });
        setShowForm(false);
      } else {
        alert('Failed to submit testimonial. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-1.5 mb-6">
              <Star size={14} className="text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium">Client Testimonials</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              What Our Clients <span className="gold-text">Say</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg mb-8">
              Real stories from real clients who trusted us with their events, printing needs, and advertising campaigns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#1A1A1A] rounded-full px-6 py-2 flex items-center gap-2">
                <span className="text-2xl font-bold text-[#C9A84C]">4.9</span>
                <div className="flex gap-0.5">
                  <Star size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                  <Star size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                  <Star size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                  <Star size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                  <Star size={14} className="fill-[#C9A84C] text-[#C9A84C]" />
                </div>
                <span className="text-[#999999] text-sm">({testimonials.length} reviews)</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="gold-card rounded-xl p-6 hover:border-[#C9A84C]/40 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-transparent flex items-center justify-center text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-[#999999]">{testimonial.role}</p>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} size={14} />
                </div>
                <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-2 text-xs text-[#666666]">
                  <Briefcase size={12} />
                  <span>{testimonial.company}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === idx ? 'w-8 bg-[#C9A84C]' : 'bg-[#444444] hover:bg-[#666666]'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Submit Testimonial CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-gold inline-flex"
            >
              {showForm ? 'Close Form' : 'Share Your Experience'}
              <Send size={18} />
            </button>
          </div>
        </Container>
      </Section>

      {/* Testimonial Submission Form */}
      {showForm && (
        <Section className="bg-[#0A0A0A] pt-0">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="gold-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Share Your Experience</h2>
                <p className="text-[#999999] mb-6">Help others make informed decisions by sharing your experience with Shalom.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={28}
                            className={`transition-colors ${
                              star <= formData.rating 
                                ? 'fill-[#C9A84C] text-[#C9A84C]' 
                                : 'text-[#444444] hover:text-[#666666]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-[#999999] text-sm ml-2 mt-1.5">{formData.rating}/5</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Your Testimonial *</label>
                    <textarea
                      name="testimonial"
                      required
                      rows={4}
                      value={formData.testimonial}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors resize-none"
                      placeholder="Share your experience working with Shalom..."
                    />
                  </div>
                  
                  <button type="submit" className="btn-gold w-full justify-center py-3">
                    Submit Testimonial
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Statistics Section */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gold-text">{testimonials.length}+</div>
              <div className="text-[#999999] text-sm mt-1">Client Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gold-text">4.9</div>
              <div className="text-[#999999] text-sm mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gold-text">98%</div>
              <div className="text-[#999999] text-sm mt-1">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gold-text">5+</div>
              <div className="text-[#999999] text-sm mt-1">Years of Trust</div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}