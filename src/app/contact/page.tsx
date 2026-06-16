'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import { COMPANY_INFO } from '@/constants';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  
  Globe,
  Navigation
} from 'lucide-react';
import {FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,}  from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          service: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get In <span className="gold-text">Touch</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg">
              We&apos;d love to hear from you. Whether you have a question about our services, 
              want to discuss a project, or just want to say hello, we&apos;re here to help.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form and Info */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="gold-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#999999] text-xs uppercase tracking-wider">Phone</p>
                      <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-[#C9A84C] transition-colors text-sm">
                        {COMPANY_INFO.phone}
                      </a>
                      <br />
                      <a href={`tel:${COMPANY_INFO.phone2}`} className="text-white hover:text-[#C9A84C] transition-colors text-sm">
                        {COMPANY_INFO.phone2}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#999999] text-xs uppercase tracking-wider">Email</p>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-[#C9A84C] transition-colors text-sm">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#999999] text-xs uppercase tracking-wider">Address</p>
                      <p className="text-white text-sm">{COMPANY_INFO.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#999999] text-xs uppercase tracking-wider">Business Hours</p>
                      <p className="text-white text-sm">{COMPANY_INFO.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="gold-card rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="grid grid-cols-4 gap-3">
                  <a 
                    href={COMPANY_INFO.social.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full aspect-square rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a 
                    href={COMPANY_INFO.social.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full aspect-square rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a 
                    href={COMPANY_INFO.social.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full aspect-square rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a 
                    href={COMPANY_INFO.social.youtube} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full aspect-square rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
                  >
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Response CTA */}
              <div className="gold-card rounded-xl p-6 bg-gradient-to-br from-[#C9A84C]/10 to-transparent">
                <h4 className="text-white font-semibold mb-2">Quick Response</h4>
                <p className="text-[#999999] text-sm mb-4">
                  We typically respond within 24 hours. For urgent inquiries, please call us directly.
                </p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#C9A84C] font-semibold text-sm hover:text-[#D4B85C] transition-colors">
                  Call Now →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="gold-card rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
                <p className="text-[#999999] mb-6">Fill in the form below and we&apos;ll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#999999] text-sm mb-2">Full Name *</label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#999999] text-sm mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#999999] text-sm mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                          placeholder="+251 911 234 567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#999999] text-sm mb-2">Service Interested In</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select a service...</option>
                        <option value="wedding-events">Wedding Events</option>
                        <option value="corporate-events">Corporate Events</option>
                        <option value="conferences">Conferences & Seminars</option>
                        <option value="product-launches">Product Launches</option>
                        <option value="exhibitions">Exhibitions & Trade Shows</option>
                        <option value="tshirt-printing">T-Shirt Printing</option>
                        <option value="logo-printing">Logo Printing</option>
                        <option value="banner-printing">Banner Printing</option>
                        <option value="promotional-materials">Promotional Materials</option>
                        <option value="business-cards">Business Cards</option>
                        <option value="brand-promotion">Brand Promotion</option>
                        <option value="digital-advertising">Digital Advertising</option>
                        <option value="outdoor-advertising">Outdoor Advertising</option>
                        <option value="marketing-campaigns">Marketing Campaigns</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-[#999999] text-sm mb-2">Your Message *</label>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-3 top-3 text-[#666666]" />
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#C9A84C] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your event or project..."
                      />
                    </div>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                      <CheckCircle size={20} />
                      <span>Thank you! Your message has been sent successfully.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                      <AlertCircle size={20} />
                      <span>Oops! Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-gold w-full justify-center py-3 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[#666666] text-xs text-center">
                    By submitting this form, you agree to our privacy policy and consent to be contacted.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <div className="gold-card rounded-2xl overflow-hidden">
            <div className="relative h-[400px] md:h-[500px] bg-[#1A1A1A] flex items-center justify-center">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.472123456789!2d38.746781!3d9.032147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b851b4e6b3e8b%3A0x6b3e8b4e6b851b4e!2sBole%20Road%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 flex items-center justify-center mx-auto mb-4">
                    <Navigation size={32} className="text-[#C9A84C]" />
                  </div>
                  <h4 className="text-white font-semibold text-xl">Find Us Here</h4>
                  <p className="text-[#999999]">{COMPANY_INFO.address}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Contact Section */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
            <p className="text-[#999999]">
              Can&apos;t find what you&apos;re looking for? Check out our most common questions below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">What services do you offer?</h4>
              <p className="text-[#999999] text-sm">We offer event management, printing services, and advertising solutions including wedding planning, corporate events, branding, and digital marketing.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">How do I get a quote?</h4>
              <p className="text-[#999999] text-sm">Fill out our contact form or call us directly. We&apos;ll discuss your requirements and provide a customized quote within 24 hours.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">Do you handle events outside Addis Ababa?</h4>
              <p className="text-[#999999] text-sm">Yes! We serve clients throughout Ethiopia. Contact us to discuss your location and requirements.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-[#999999] text-sm">We accept bank transfers, mobile money, and cash. Payment plans can be arranged for large events and projects.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="text-[#C9A84C] hover:text-[#D4B85C] transition-colors font-semibold">
              Explore Our Services →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}