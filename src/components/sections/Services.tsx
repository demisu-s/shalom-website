'use client';

import { useState } from 'react';
import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import ServiceCard from '../shared/ServiceCard';
import { SERVICE_CATEGORIES } from '@/constants';
import {services} from '@/data/services';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = services.filter(service => 
    activeCategory === 'all' ? true : service.category === activeCategory
  );

  return (
    <Section>
      <Container>
        <SectionHeader
          badge="What We Offer"
          title="Comprehensive Services"
          subtitle="From event planning to printing and advertising, we provide end-to-end solutions tailored to your needs."
        />
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A84C] text-black'
                  : 'bg-[#1A1A1A] text-[#999999] hover:bg-[#2A2A2A] hover:text-white border border-[#2A2A2A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}