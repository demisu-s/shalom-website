/* eslint-disable react-hooks/purity */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import StarRating from '@/components/ui/StarRating';
import { testimonials } from '@/data/testimonials';
import { 
  Quote, 
  Send, 
  Star, 
  Calendar, 
  User, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  MessageCircle,
  ThumbsUp,
  Clock,
  MapPin,
  CreditCard,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Award,
  Heart,
  Sparkles,
  Shield,
  Gift
} from 'lucide-react';

// FAQ Data with icons
const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "For events, we recommend booking 2-3 months in advance. For printing services, 2-3 weeks is typically sufficient. Rush services are available for an additional fee.",
    icon: <Clock size={20} />,
    category: "Booking"
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes! We tailor our packages to meet your specific requirements and budget. Contact us for a custom quote and we'll work with you to create the perfect solution.",
    icon: <Gift size={20} />,
    category: "Packages"
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Addis Ababa and surrounding areas, but we can accommodate events anywhere in Ethiopia. Travel arrangements can be made for remote locations.",
    icon: <MapPin size={20} />,
    category: "Service Area"
  },
  {
    question: "Do you offer rush services?",
    answer: "Yes, rush services are available for printing and certain event services for an additional fee. Please contact us for specific timelines and pricing.",
    icon: <Zap size={20} />,
    category: "Timeline"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, mobile money, and cash payments. Payment plans can be arranged for large events and corporate clients.",
    icon: <CreditCard size={20} />,
    category: "Payment"
  },
  {
    question: "Do you provide event staff?",
    answer: "Absolutely! Our packages include professional event coordinators, and we can provide additional staff as needed for setup, coordination, and guest services.",
    icon: <Users size={20} />,
    category: "Staffing"
  },
  {
    question: "What types of events do you specialize in?",
    answer: "We specialize in weddings, corporate events, conferences, product launches, exhibitions, and private celebrations of all sizes.",
    icon: <Sparkles size={20} />,
    category: "Events"
  },
  {
    question: "Do you offer satisfaction guarantees?",
    answer: "Yes! We're committed to your satisfaction. If you're not happy with our service, we'll work to make it right. Our reputation is built on client satisfaction.",
    icon: <Shield size={20} />,
    category: "Guarantee"
  },
  {
    question: "Can I see samples of your work?",
    answer: "Absolutely! Visit our Portfolio page to see examples of our work. We're proud of our track record and happy to share our success stories.",
    icon: <Award size={20} />,
    category: "Portfolio"
  },
];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState<string[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [hoveredTestimonial, setHoveredTestimonial] = useState<string | null>(null);
  const [animateStats, setAnimateStats] = useState(false);
  const testimonialsPerPage = 6;

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const startIndex = currentPage * testimonialsPerPage;
  const endIndex = startIndex + testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  // FAQ categories
  const faqCategories = ['all', ...new Set(faqs.map(f => f.category))];
  const filteredFaqs = selectedFaqCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === selectedFaqCategory);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-testimonial-id');
            if (id && !visibleTestimonials.includes(id)) {
              setVisibleTestimonials(prev => [...prev, id]);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('[data-testimonial-id]');
    elements.forEach((el) => observer.observe(el));

    // Stats animation trigger
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateStats(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      statsObserver.observe(statsElement);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, [currentTestimonials, visibleTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Thank you for your testimonial! It will be reviewed and published soon.');
      setFormData({ name: '', email: '', company: '', rating: 5, testimonial: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl animate-pulse-slow" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#C9A84C]/20 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-1.5 mb-6 animate-slide-down border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors duration-300">
              <Star size={14} className="text-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-sm font-medium">Client Testimonials</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              What Our Clients <span className="gold-text">Say</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Real stories from real clients who trusted us with their events, printing needs, and advertising campaigns.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-[#1A1A1A] rounded-full px-6 py-2 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#C9A84C]/10 border border-[#2A2A2A] hover:border-[#C9A84C]/30 cursor-default">
                <span className="text-2xl font-bold text-[#C9A84C]">4.9</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className="fill-[#C9A84C] text-[#C9A84C] animate-twinkle" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <span className="text-[#999999] text-sm">({testimonials.length} reviews)</span>
              </div>
              <div className="bg-[#1A1A1A] rounded-full px-6 py-2 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#C9A84C]/10 border border-[#2A2A2A] hover:border-[#C9A84C]/30 cursor-default">
                <ThumbsUp size={16} className="text-[#C9A84C]" />
                <span className="text-[#999999] text-sm">98% Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial, index) => {
              const isVisible = visibleTestimonials.includes(testimonial.id);
              const isHovered = hoveredTestimonial === testimonial.id;

              return (
                <div 
                  key={testimonial.id}
                  data-testimonial-id={testimonial.id}
                  className={`gold-card rounded-xl p-6 transition-all duration-700 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } hover:border-[#C9A84C]/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9A84C]/10 cursor-pointer group relative overflow-hidden`}
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={() => setHoveredTestimonial(testimonial.id)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 via-[#C9A84C]/0 to-[#C9A84C]/0 transition-all duration-700 ${isHovered ? 'from-[#C9A84C]/5 via-[#C9A84C]/10 to-[#C9A84C]/5' : ''}`} />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-transparent flex items-center justify-center text-xl text-white font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/20 ${isHovered ? 'scale-110 shadow-lg shadow-[#C9A84C]/20' : ''}`}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold transition-colors duration-300 group-hover:text-[#C9A84C]">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-[#999999]">{testimonial.role}</p>
                        </div>
                      </div>
                      <StarRating rating={testimonial.rating} size={14} />
                    </div>
                    <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4 relative">
                      <Quote size={14} className={`text-[#C9A84C] absolute -top-1 -left-1 transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-30'}`} />
                      <span className="pl-4">&ldquo;{testimonial.content}&rdquo;</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#666666]">
                      <Briefcase size={12} className="transition-colors duration-300 group-hover:text-[#C9A84C]" />
                      <span className="group-hover:text-[#999] transition-colors duration-300">{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg hover:shadow-[#C9A84C]/10 group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`transition-all duration-300 ${
                      currentPage === idx 
                        ? 'w-8 h-2.5 rounded-full bg-[#C9A84C] shadow-lg shadow-[#C9A84C]/25' 
                        : 'w-2 h-2 rounded-full bg-[#444444] hover:bg-[#666666] hover:scale-125'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg hover:shadow-[#C9A84C]/10 group"
              >
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* Submit Testimonial CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-gold inline-flex group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {showForm ? 'Close Form' : 'Share Your Experience'}
                <Send size={18} className={`transition-all duration-300 ${showForm ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/0 via-white/20 to-[#C9A84C]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </Container>
      </Section>

      {/* Testimonial Submission Form */}
      {showForm && (
        <Section className="bg-[#0A0A0A] pt-0">
          <Container>
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="gold-card rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/10">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <MessageCircle size={24} className="text-[#C9A84C] animate-bounce" />
                  Share Your Experience
                </h2>
                <p className="text-[#999999] mb-6">Help others make informed decisions by sharing your experience with Shalom.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="group">
                    <label className="block text-[#999999] text-sm mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10 group-hover:border-[#3A3A3A]"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-[#999999] text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10 group-hover:border-[#3A3A3A]"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-[#999999] text-sm mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10 group-hover:border-[#3A3A3A]"
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
                          className="focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            size={28}
                            className={`transition-all duration-300 ${
                              star <= formData.rating 
                                ? 'fill-[#C9A84C] text-[#C9A84C] scale-110' 
                                : 'text-[#444444] hover:text-[#666666]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-[#999999] text-sm ml-2 mt-1.5">{formData.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-[#999999] text-sm mb-2">Your Testimonial *</label>
                    <textarea
                      name="testimonial"
                      required
                      rows={4}
                      value={formData.testimonial}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10 group-hover:border-[#3A3A3A] resize-none"
                      placeholder="Share your experience working with Shalom..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-gold w-full justify-center py-3 group relative overflow-hidden"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Testimonial
                          <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ Section - 3 Column Interactive Accordion */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-1.5 mb-4 border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors duration-300">
              <HelpCircle size={14} className="text-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
            <p className="text-[#999999]">
              Everything you need to know about our services
            </p>
          </div>

          {/* FAQ Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFaqCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedFaqCategory === category
                    ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25'
                    : 'bg-[#1A1A1A] text-[#999999] hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C]/30'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* 3 Column FAQ Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              
              return (
                <div 
                  key={index}
                  className={`gold-card rounded-xl transition-all duration-500 overflow-hidden group ${
                    isExpanded 
                      ? 'border-[#C9A84C]/40 shadow-lg shadow-[#C9A84C]/10 scale-[1.02]' 
                      : 'hover:border-[#C9A84C]/20 hover:shadow-md hover:shadow-[#C9A84C]/5'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left relative"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C9A84C] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/20 ${
                        isExpanded ? 'bg-[#C9A84C]/20 scale-110 shadow-lg shadow-[#C9A84C]/20' : ''
                      }`}>
                        {faq.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`font-semibold transition-colors duration-300 ${
                            isExpanded ? 'text-[#C9A84C]' : 'text-white group-hover:text-[#C9A84C]'
                          }`}>
                            {faq.question}
                          </h4>
                          <ChevronDown 
                            size={16} 
                            className={`flex-shrink-0 text-[#666] transition-all duration-500 ${
                              isExpanded ? 'rotate-180 text-[#C9A84C]' : 'group-hover:text-[#C9A84C]'
                            }`} 
                          />
                        </div>
                        <div 
                          className={`overflow-hidden transition-all duration-500 ${
                            isExpanded ? 'max-h-48 mt-2 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="text-[#999999] text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                          <div className="mt-2 pt-2 border-t border-[#2A2A2A]">
                            <span className="text-xs text-[#666666] bg-[#1A1A1A] px-2 py-0.5 rounded-full">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* FAQ CTA */}
          <div className="mt-10 text-center">
            <p className="text-[#999999] text-sm mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#D4B85C] transition-all duration-300 group hover:gap-3"
            >
              <span>Contact Us</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Statistics Section - Animated */}
      <div id="stats-section">
        <Section className="bg-[#0A0A0A] pt-0">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: testimonials.length, label: 'Client Reviews', suffix: '+', icon: <MessageCircle size={20} /> },
              { value: '4.9', label: 'Average Rating', suffix: '', icon: <Star size={20} /> },
              { value: '98', label: 'Satisfaction Rate', suffix: '%', icon: <ThumbsUp size={20} /> },
              { value: '5', label: 'Years of Trust', suffix: '+', icon: <Heart size={20} /> },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center transition-all duration-500 transform hover:scale-105 group relative gold-card rounded-xl p-6"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C9A84C] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/20">
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-3xl md:text-4xl font-bold gold-text transition-all duration-1000 ${
                  animateStats ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[#999999] text-sm mt-1 transition-colors duration-300 group-hover:text-[#C9A84C]">
                  {stat.label}
                </div>
              </div>
            ))}
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}