'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import {SERVICE_CATEGORIES } from '@/constants';
import {services} from '@/data/services';
import { Check, ArrowRight, Sparkles, Calendar, Printer, Megaphone } from 'lucide-react';
import type { Service } from '@/types';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(service => 
    activeCategory === 'all' ? true : service.category === activeCategory
  );

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'event-management': return <Calendar className="text-[#C9A84C]" size={24} />;
      case 'printing': return <Printer className="text-[#C9A84C]" size={24} />;
      case 'advertising': return <Megaphone className="text-[#C9A84C]" size={24} />;
      default: return <Sparkles className="text-[#C9A84C]" size={24} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'event-management': return 'from-purple-900/20 to-purple-900/5 border-purple-500/20';
      case 'printing': return 'from-blue-900/20 to-blue-900/5 border-blue-500/20';
      case 'advertising': return 'from-green-900/20 to-green-900/5 border-green-500/20';
      default: return 'from-gold-900/20 to-gold-900/5 border-gold-500/20';
    }
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
              Our <span className="gold-text">Services</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg mb-8">
              Comprehensive solutions tailored to bring your vision to life. 
              From event planning to printing and advertising, we deliver excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2">
                <Sparkles size={16} className="text-[#C9A84C]" />
                <span className="text-sm text-[#CCCCCC]">Event Management</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2">
                <Printer size={16} className="text-[#C9A84C]" />
                <span className="text-sm text-[#CCCCCC]">Printing Services</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2">
                <Megaphone size={16} className="text-[#C9A84C]" />
                <span className="text-sm text-[#CCCCCC]">Advertising</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filters */}
      <Section className="pt-0">
        <Container>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25'
                    : 'bg-[#1A1A1A] text-[#999999] hover:bg-[#2A2A2A] hover:text-white border border-[#2A2A2A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="space-y-12">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                id={service.id}
                className={`gold-card rounded-2xl overflow-hidden bg-gradient-to-br ${getCategoryColor(service.category)}`}
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl">{service.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {service.title}
                      </h2>
                      <p className="text-[#999999]">{service.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Check size={18} className="text-[#C9A84C]" />
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-[#CCCCCC] text-sm">
                          <Check size={14} className="text-[#C9A84C] flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Packages */}
                  {service.packages && service.packages.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-[#C9A84C]" />
                        Pricing Packages
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {service.packages.map((pkg) => (
                          <div 
                            key={pkg.name}
                            className={`rounded-xl p-5 ${
                              pkg.popular 
                                ? 'bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border-2 border-[#C9A84C]' 
                                : 'bg-[#1A1A1A] border border-[#2A2A2A]'
                            }`}
                          >
                            {pkg.popular && (
                              <div className="text-xs text-[#C9A84C] font-semibold mb-2 uppercase tracking-wider">
                                Most Popular
                              </div>
                            )}
                            <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
                            <div className="text-2xl font-bold gold-text mb-4">{pkg.price}</div>
                            <ul className="space-y-2 mb-4">
                              {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-[#CCCCCC]">
                                  <Check size={12} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Link href="/contact" className="block text-center py-2 rounded-lg bg-[#C9A84C] text-black font-semibold hover:bg-[#D4B85C] transition-colors text-sm">
                              Get Started
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center gold-card rounded-2xl p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-[#999999] mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss your specific requirements and create a tailored package that fits your needs and budget.
            </p>
            <Link href="/contact" className="btn-gold inline-flex">
              Get a Custom Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
            <p className="text-[#999999]">
              Everything you need to know about our services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">How far in advance should I book?</h4>
              <p className="text-[#999999] text-sm">For events, we recommend booking 2-3 months in advance. For printing services, 2-3 weeks is typically sufficient.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">Do you offer custom packages?</h4>
              <p className="text-[#999999] text-sm">Yes! We tailor our packages to meet your specific requirements and budget. Contact us for a custom quote.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">What areas do you serve?</h4>
              <p className="text-[#999999] text-sm">We primarily serve Addis Ababa and surrounding areas, but we can accommodate events anywhere in Ethiopia.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">Do you offer rush services?</h4>
              <p className="text-[#999999] text-sm">Yes, rush services are available for printing and certain event services for an additional fee.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-[#999999] text-sm">We accept bank transfers, mobile money, and cash payments. Payment plans can be arranged for large events.</p>
            </div>
            <div className="gold-card rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">Do you provide event staff?</h4>
              <p className="text-[#999999] text-sm">Absolutely! Our packages include professional event coordinators, and we can provide additional staff as needed.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}