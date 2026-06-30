'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import { PROJECT_CATEGORIES } from '@/constants';
import { projects } from '@/data/projects';
import { Calendar, User, Tag, ExternalLink, Sparkles } from 'lucide-react';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' ? true : project.category === activeCategory
  );

  // Use useCallback to memoize the observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const newVisibleIds: string[] = [];
    
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const projectId = entry.target.getAttribute('data-project-id');
        if (projectId) {
          newVisibleIds.push(projectId);
        }
      }
    });

    // Batch all state updates together
    if (newVisibleIds.length > 0) {
      setVisibleProjects(prev => {
        // Only add IDs that aren't already visible
        const uniqueNewIds = newVisibleIds.filter(id => !prev.includes(id));
        return uniqueNewIds.length > 0 ? [...prev, ...uniqueNewIds] : prev;
      });
    }
  }, []);

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    const projectElements = document.querySelectorAll('[data-project-id]');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects, handleIntersection]);

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'events': return '🎉';
      case 'printing': return '🖨️';
      case 'advertising': return '📢';
      case 'branding': return '🎨';
      default: return '📁';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'events': return {
        bg: 'from-purple-900/30 to-purple-900/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        glow: 'shadow-purple-500/20'
      };
      case 'printing': return {
        bg: 'from-blue-900/30 to-blue-900/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        glow: 'shadow-blue-500/20'
      };
      case 'advertising': return {
        bg: 'from-green-900/30 to-green-900/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        badge: 'bg-green-500/20 text-green-400 border-green-500/30',
        glow: 'shadow-green-500/20'
      };
      case 'branding': return {
        bg: 'from-orange-900/30 to-orange-900/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        glow: 'shadow-orange-500/20'
      };
      default: return {
        bg: 'from-gray-900/30 to-gray-900/10',
        border: 'border-gray-500/30',
        text: 'text-gray-400',
        badge: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        glow: 'shadow-gray-500/20'
      };
    }
  };

  return (
    <Section className="bg-[#0A0A0A] overflow-hidden">
      <Container>
        <SectionHeader
          badge="Our Work"
          title="Recent Projects"
          subtitle="Explore some of our successful events and campaigns that showcase our expertise and creativity."
        />
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PROJECT_CATEGORIES.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === cat.id
                  ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25 scale-105'
                  : 'bg-[#1A1A1A] text-[#999999] hover:bg-[#2A2A2A] hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C]/30'
              }`}
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const hasError = imageErrors[project.id] || false;
            const isVisible = visibleProjects.includes(project.id);
            const colors = getCategoryColor(project.category);
            const isHovered = hoveredProject === project.id;

            return (
              <div 
                key={project.id}
                data-project-id={project.id}
                className={`group relative overflow-hidden rounded-xl bg-[#1A1A1A] border-2 transition-all duration-700 transform ${
                  colors.border
                } ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${
                  isHovered ? `scale-[1.02] ${colors.glow} shadow-2xl` : 'scale-100'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${colors.bg}`} />
                
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                  
                  {!hasError ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => handleImageError(project.id)}
                        priority={parseInt(project.id) <= 3}
                        loading={parseInt(project.id) <= 3 ? 'eager' : 'lazy'}
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
                      <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                        <span className="text-6xl block mb-2 animate-bounce">
                          {getCategoryIcon(project.category)}
                        </span>
                        <span className="text-xs text-[#666666]">Image coming soon</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className={`absolute top-3 right-3 z-20 transform transition-all duration-500 ${
                    isHovered ? 'scale-110 -translate-y-1' : 'scale-100'
                  }`}>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm ${colors.badge}`}>
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className={`absolute bottom-3 right-3 z-20 transform transition-all duration-500 ${
                    isHovered ? 'scale-110 -translate-x-1' : 'scale-100'
                  }`}>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 flex items-center gap-1">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>

                  {/* Client Badge */}
                  <div className={`absolute top-3 left-3 z-20 transform transition-all duration-500 ${
                    isHovered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 flex items-center gap-1">
                      <User size={12} />
                      {project.client}
                    </span>
                  </div>

                  {/* View Details Overlay */}
                  <div className={`absolute inset-0 z-15 flex items-center justify-center transition-all duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="transform transition-all duration-500 delay-100">
                      <Link href={`/portfolio/${project.id}`}>
                        <button 
                          className="px-6 py-3 rounded-full bg-[#C9A84C] text-black font-semibold hover:bg-[#D4B85C] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#C9A84C]/30 flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          View Project
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${colors.text}`}>
                        {project.category}
                      </span>
                      <div className={`w-1 h-1 rounded-full ${colors.text} opacity-50`} />
                      <span className="text-xs text-[#666666]">{project.year}</span>
                    </div>
                    <div className={`transform transition-all duration-500 ${
                      isHovered ? 'rotate-180' : 'rotate-0'
                    }`}>
                      <Sparkles size={14} className="text-[#C9A84C]" />
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold text-white mb-2 transition-all duration-300 ${
                    isHovered ? `text-[#C9A84C] translate-x-1` : ''
                  }`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-[#999999] text-sm mb-3 transition-all duration-300 ${
                    isHovered ? 'text-[#AAAAAA]' : ''
                  }`}>
                    {project.client}
                  </p>
                  
                  <p className={`text-[#CCCCCC] text-sm line-clamp-2 transition-all duration-300 ${
                    isHovered ? 'text-white' : ''
                  }`}>
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tag} 
                        className={`text-xs px-2.5 py-1 rounded-full bg-[#2A2A2A] text-[#999999] transition-all duration-300 ${
                          isHovered ? 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20' : ''
                        }`}
                        style={{
                          transitionDelay: `${tagIndex * 0.05}s`
                        }}
                      >
                        <Tag size={10} className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#2A2A2A] text-[#666666]">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Animated bottom border */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${colors.bg} transition-all duration-700 ${
                    isHovered ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
