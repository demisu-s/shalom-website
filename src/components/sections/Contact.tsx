'use client';

import { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="gold-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
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
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#999999] text-sm">Email</p>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-[#C9A84C] transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-[#999999] text-sm">Address</p>
                    <p className="text-white">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
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
            <div className="rounded-xl overflow-hidden h-64 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
              <p className="text-[#666666]">📍 Map View - {COMPANY_INFO.address}</p>
            </div>
          </div>
          
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="gold-card rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
            <div className="space-y-4">
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
                <label className="block text-[#999999] text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                  placeholder="+251 911 234 567"
                />
              </div>
              
              <div>
                <label className="block text-[#999999] text-sm mb-2">Your Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your event or project..."
                />
              </div>
              
              <button type="submit" className="btn-gold w-full justify-center py-3">
                Send Message
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}