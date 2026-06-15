'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import { PROJECT_CATEGORIES } from '@/constants';
import {projects} from '@/data/projects';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' ? true : project.category === activeCategory
  );

  return (
    <Section className="bg-[#0A0A0A]">
      <Container>
        <SectionHeader
          badge="Our Work"
          title="Recent Projects"
          subtitle="Explore some of our successful events and campaigns that showcase our expertise and creativity."
        />
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PROJECT_CATEGORIES.map((cat) => (
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
        
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C]/50 transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="w-full h-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
                  <span className="text-6xl">
                    {project.category === 'events' && '🎉'}
                    {project.category === 'printing' && '🖨️'}
                    {project.category === 'advertising' && '📢'}
                    {project.category === 'branding' && '🎨'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#C9A84C] font-medium uppercase tracking-wider">{project.category}</span>
                  <span className="text-xs text-[#666666]">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#999999] text-sm mb-3">{project.client}</p>
                <p className="text-[#CCCCCC] text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#2A2A2A] text-[#999999]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}