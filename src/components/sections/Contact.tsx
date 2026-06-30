'use client';

import { useState, useEffect, useRef } from 'react';
import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { COMPANY_INFO } from '@/constants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-card-index');
            if (index && !visibleCards.includes(parseInt(index))) {
              setVisibleCards(prev => [...prev, parseInt(index)]);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const cardElements = document.querySelectorAll('[data-card-index]');
    cardElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleCards]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Section className="bg-[#0A0A0A]">
      <Container>
        <SectionHeader
          badge="Get In Touch"
          title="Let's Work Together"
          subtitle="Ready to create something amazing? Contact us today to discuss your event or advertising needs."
        />
        
        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div 
              data-card-index="0"
              className={`gold-card rounded-xl p-6 transition-all duration-700 transform ${
                visibleCards.includes(0) ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              } hover:shadow-2xl hover:shadow-[#C9A84C]/10`}
            >
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C9A84C]/20 group-hover:scale-110">
                    <Phone size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#999999] text-sm">Phone</p>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-[#C9A84C] transition-colors">
                      {COMPANY_INFO.phone}
                    </a>
                    <br />
                    <a href={`tel:${COMPANY_INFO.phone2}`} className="text-white hover:text-[#C9A84C] transition-colors">
                      {COMPANY_INFO.phone2}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C9A84C]/20 group-hover:scale-110">
                    <Mail size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#999999] text-sm">Email</p>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-[#C9A84C] transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C9A84C]/20 group-hover:scale-110">
                    <MapPin size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#999999] text-sm">Address</p>
                    <p className="text-white">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#C9A84C]/20 group-hover:scale-110">
                    <Clock size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#999999] text-sm">Business Hours</p>
                    <p className="text-white">{COMPANY_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map placeholder */}
            <div 
              data-card-index="1"
              className={`rounded-xl overflow-hidden h-64 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center transition-all duration-700 transform ${
                visibleCards.includes(1) ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              } hover:border-[#C9A84C]/40 transition-colors`}
              style={{ transitionDelay: '0.1s' }}
            >
              <p className="text-[#666666]">📍 Map View - {COMPANY_INFO.address}</p>
            </div>
          </div>
          
          {/* Contact form */}
          <div 
            data-card-index="2"
            className={`transition-all duration-700 transform ${
              visibleCards.includes(2) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <form onSubmit={handleSubmit} className="gold-card rounded-xl p-6 hover:shadow-2xl hover:shadow-[#C9A84C]/10 transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[#999999] text-sm mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10"
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
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-[#999999] text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10"
                    placeholder="+251 911 234 567"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-[#999999] text-sm mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#C9A84C]/10 resize-none"
                    placeholder="Tell us about your event or project..."
                  />
                </div>
                
                <button type="submit" className="btn-gold w-full justify-center py-3 group">
                  Send Message
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
