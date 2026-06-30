'use client';

import { Suspense } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import { PROJECT_CATEGORIES } from '@/constants';
import { projects } from '@/data/projects';
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Eye, 
  X,
  Grid,
  List,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Image as ImageIcon
} from 'lucide-react';

// Loading fallback component
function PortfolioLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#999999]">Loading portfolio...</p>
      </div>
    </div>
  );
}

// Main portfolio content component that uses useSearchParams
function PortfolioContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Set initial category from URL parameter
  const getInitialCategory = () => {
    if (categoryParam && PROJECT_CATEGORIES.some(cat => cat.id === categoryParam)) {
      return categoryParam;
    }
    return 'all';
  };

  const [activeCategory, setActiveCategory] = useState<string>(getInitialCategory);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState<Record<string, boolean>>({});
  const [hasInteracted, setHasInteracted] = useState<Record<string, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const observerRefs = useRef<Record<string, IntersectionObserver | null>>({});

  const getOptimizedImagePath = (imagePath: string) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    if (cleanPath.includes('optimized/')) {
      return imagePath;
    }
    const filename = cleanPath.split('/').pop();
    if (!filename) return imagePath;
    return `/images/optimized/${filename}`;
  };

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' ? true : project.category === activeCategory
  );

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'events': return '🎉';
      case 'printing': return '🖨️';
      case 'advertising': return '📢';
      case 'branding': return '🎨';
      default: return '📁';
    }
  };

  // Intersection Observer for scroll animations
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

    if (newVisibleIds.length > 0) {
      setVisibleProjects(prev => {
        const uniqueNewIds = newVisibleIds.filter(id => !prev.includes(id));
        return uniqueNewIds.length > 0 ? [...prev, ...uniqueNewIds] : prev;
      });
    }
  }, []);

  // Setup Intersection Observer for projects
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    const projectElements = document.querySelectorAll('[data-project-id]');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects, handleIntersection]);

  // Setup intersection observer for video autoplay
  useEffect(() => {
    if (typeof window === 'undefined') return;

    Object.keys(videoRefs.current).forEach((projectId) => {
      const video = videoRefs.current[projectId];
      if (!video) return;

      if (observerRefs.current[projectId]) {
        observerRefs.current[projectId]?.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const videoElement = videoRefs.current[projectId];
            if (!videoElement) return;

            if (entry.isIntersecting) {
              if (!hasInteracted[projectId]) {
                videoElement.play().catch(() => {
                  console.log('Autoplay prevented, user interaction required');
                });
                setIsPlaying(prev => ({ ...prev, [projectId]: true }));
              }
            } else {
              if (!hasInteracted[projectId] && isPlaying[projectId]) {
                videoElement.pause();
                setIsPlaying(prev => ({ ...prev, [projectId]: false }));
              }
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(video);
      observerRefs.current[projectId] = observer;
    });

    return () => {
      Object.values(observerRefs.current).forEach((observer) => {
        observer?.disconnect();
      });
    };
  }, [filteredProjects, hasInteracted, isPlaying]);

  const togglePlay = (projectId: string) => {
    const video = videoRefs.current[projectId];
    if (video) {
      if (isPlaying[projectId]) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(prev => ({ ...prev, [projectId]: !prev[projectId] }));
      setHasInteracted(prev => ({ ...prev, [projectId]: true }));
    }
  };

  const toggleMute = (projectId: string) => {
    const video = videoRefs.current[projectId];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(prev => ({ ...prev, [projectId]: !prev[projectId] }));
      setHasInteracted(prev => ({ ...prev, [projectId]: true }));
    }
  };

  const handleVideoEnd = (projectId: string) => {
    setIsPlaying(prev => ({ ...prev, [projectId]: false }));
  };

  const handleVideoClick = (projectId: string) => {
    togglePlay(projectId);
  };

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const totalProjects = projects.length;
  const categories = [...new Set(projects.map(p => p.category))];

  // Scroll to category section when category changes from URL
  useEffect(() => {
    if (categoryParam) {
      const element = document.getElementById('portfolio-grid');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [categoryParam]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl animate-pulse-slow" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Our <span className="gold-text">Portfolio</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore our collection of successful events, printing projects, and advertising campaigns 
              that showcase our creativity and expertise.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[
                { value: totalProjects, label: 'Projects' },
                { value: categories.length, label: 'Categories' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#C9A84C]/10">
                  <span className="text-[#C9A84C] font-bold">{stat.value}</span>
                  <span className="text-[#999999] ml-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <div id="portfolio-grid">
        <Section>
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === 'all'
                    ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25'
                    : 'bg-[#1A1A1A] text-[#999999] hover:bg-[#2A2A2A] hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C]/30'
                }`}
              >
                All Projects
              </button>
              {PROJECT_CATEGORIES.filter(cat => cat.id !== 'all').map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === cat.id
                      ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25'
                      : 'bg-[#1A1A1A] text-[#999999] hover:bg-[#2A2A2A] hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C]/30'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  viewMode === 'grid' 
                    ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25' 
                    : 'bg-[#1A1A1A] text-[#999999] hover:text-white hover:bg-[#2A2A2A]'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  viewMode === 'list' 
                    ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25' 
                    : 'bg-[#1A1A1A] text-[#999999] hover:text-white hover:bg-[#2A2A2A]'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="text-xs text-[#666666] bg-[#1A1A1A] px-4 py-2 rounded-full">
              ▶ Videos autoplay when visible • Hover for controls
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#999999]">No projects found in this category.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredProjects.map((project, index) => {
                const hasVideo = project.videoUrl || false;
                const projectId = project.id;
                const hasImageError = imageErrors[projectId] || false;
                const imagePath = project.image;
                const isVisible = visibleProjects.includes(projectId);

                return (
                  <div 
                    key={project.id}
                    data-project-id={project.id}
                    className={`group relative overflow-hidden rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] transition-all duration-700 transform ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    } hover:border-[#C9A84C]/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9A84C]/10 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}
                    style={{
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Video/Image Section */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'md:w-96 h-56 md:h-auto flex-shrink-0' : 'h-64'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      
                      {hasVideo ? (
                        <div 
                          className="relative w-full h-full bg-black cursor-pointer"
                          onClick={() => handleVideoClick(projectId)}
                        >
                          <video
                            ref={(el) => {
                              if (el) {
                                videoRefs.current[projectId] = el;
                                el.muted = true;
                              }
                            }}
                            className="w-full h-full object-cover"
                            muted={isMuted[projectId] ?? true}
                            loop={false}
                            playsInline
                            autoPlay={false}
                            onEnded={() => handleVideoEnd(projectId)}
                            poster={project.thumbnail || '/images/video-placeholder.jpg'}
                            onError={(e) => {
                              console.error('Video failed to load:', project.videoUrl);
                              e.currentTarget.style.display = 'none';
                            }}
                          >
                            <source src={project.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {!isPlaying[projectId] && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                              <div className="w-16 h-16 rounded-full bg-[#C9A84C] flex items-center justify-center transform transition-transform hover:scale-110">
                                <Play size={28} className="text-black ml-1" />
                              </div>
                            </div>
                          )}
                          
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePlay(projectId);
                                }}
                                className="text-white hover:text-[#C9A84C] transition-colors"
                              >
                                {isPlaying[projectId] ? <Pause size={18} /> : <Play size={18} />}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMute(projectId);
                                }}
                                className="text-white hover:text-[#C9A84C] transition-colors"
                              >
                                {isMuted[projectId] ? <VolumeX size={18} /> : <Volume2 size={18} />}
                              </button>
                              <span className="text-white/60 text-xs">
                                {isPlaying[projectId] ? 'Playing' : 'Paused'}
                              </span>
                              <span className="text-white/40 text-xs ml-auto">
                                {hasInteracted[projectId] ? 'Manual' : 'Autoplay'}
                              </span>
                            </div>
                          </div>

                          {!hasInteracted[projectId] && isPlaying[projectId] && (
                            <div className="absolute top-3 left-3 z-20">
                              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center gap-1 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-ping" />
                                Autoplay
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full h-full bg-[#1A1A1A]">
                          {!hasImageError ? (
                            <Image
                              src={imagePath}
                              alt={project.title}
                              fill
                              className={`object-cover transition-all duration-700 group-hover:scale-110`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              onError={() => handleImageError(projectId)}
                              priority={parseInt(projectId) <= 3}
                              loading={parseInt(projectId) <= 3 ? 'eager' : 'lazy'}
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex flex-col items-center justify-center text-6xl ${
                              viewMode === 'list' ? 'min-h-[200px]' : ''
                            }`}>
                              <ImageIcon size={48} className="text-[#444444] mb-2" />
                              <span className="text-xs text-[#444444]">No image</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="btn-gold text-sm py-2 px-4 transform transition-all duration-300 hover:scale-105"
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                      </div>
                      
                      <div className="absolute top-3 right-3 z-30">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-all duration-300 group-hover:scale-105 ${
                          project.category === 'events' ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' :
                          project.category === 'printing' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                          project.category === 'advertising' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                          'text-orange-400 bg-orange-400/10 border-orange-400/20'
                        }`}>
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                      </div>
                      
                      {hasVideo && (
                        <div className="absolute top-3 left-3 z-30">
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center gap-1">
                            <Play size={10} fill="#C9A84C" />
                            Video
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={`p-6 flex-1 ${
                      viewMode === 'list' ? 'flex flex-col justify-center' : ''
                    }`}>
                      <div className="flex items-center gap-2 text-xs text-[#666666] mb-2">
                        <Calendar size={12} />
                        <span>{project.year}</span>
                        <span className="w-px h-3 bg-[#2A2A2A]" />
                        <User size={12} />
                        <span>{project.client}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className={`text-[#999999] text-sm ${
                        viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'
                      }`}>
                        {project.description}
                      </p>
                      
                      {viewMode === 'list' && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#2A2A2A] text-[#999999]">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-[#2A2A2A] text-[#666666]">
                              +{project.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      {viewMode === 'grid' && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#2A2A2A] text-[#999999]">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-[#2A2A2A] text-[#666666]">
                              +{project.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/contact" className="btn-gold inline-flex group">
                Start Your Project
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="text-[#666666] text-sm mt-3">
                Ready to create something amazing? Let&apos;s bring your vision to life.
              </p>
            </div>
          )}
        </Container>
        </Section>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#111111] rounded-2xl border border-[#2A2A2A] animate-scale-in">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors text-white hover:scale-110"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{getCategoryIcon(selectedProject.category)}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-[#999999]">
                    <span>{selectedProject.client}</span>
                    <span className="w-px h-3 bg-[#2A2A2A]" />
                    <span>{selectedProject.year}</span>
                  </div>
                </div>
              </div>

              {selectedProject.videoUrl ? (
                <div className="mb-6 rounded-xl overflow-hidden bg-black">
                  <video
                    controls
                    autoPlay
                    className="w-full max-h-[400px] object-contain"
                    poster={selectedProject.thumbnail || '/images/video-placeholder.jpg'}
                  >
                    <source src={selectedProject.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="mb-6 rounded-xl overflow-hidden bg-[#1A1A1A] relative h-64 md:h-96">
                  <Image
                    src={getOptimizedImagePath(selectedProject.image)}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="gold-card rounded-xl p-4 transition-all duration-300 hover:border-[#C9A84C]/40">
                    <h4 className="text-white font-semibold mb-2">Project Details</h4>
                    <p className="text-[#CCCCCC] text-sm">{selectedProject.description}</p>
                  </div>

                  <div className="gold-card rounded-xl p-4 transition-all duration-300 hover:border-[#C9A84C]/40">
                    <h4 className="text-white font-semibold mb-2">Project Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#2A2A2A] text-[#C9A84C]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="gold-card rounded-xl p-4 transition-all duration-300 hover:border-[#C9A84C]/40">
                    <h4 className="text-white font-semibold mb-2">Category</h4>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full border ${
                      selectedProject.category === 'events' ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' :
                      selectedProject.category === 'printing' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                      selectedProject.category === 'advertising' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                      'text-orange-400 bg-orange-400/10 border-orange-400/20'
                    }`}>
                      {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="gold-card rounded-xl p-4 transition-all duration-300 hover:border-[#C9A84C]/40">
                    <h4 className="text-white font-semibold mb-3">Project Highlights</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-[#CCCCCC]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        Completed {selectedProject.year}
                      </li>
                      <li className="flex items-center gap-2 text-[#CCCCCC]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        Client: {selectedProject.client}
                      </li>
                      <li className="flex items-center gap-2 text-[#CCCCCC]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        Category: {selectedProject.category}
                      </li>
                      {selectedProject.videoUrl && (
                        <li className="flex items-center gap-2 text-[#C9A84C]">
                          <Play size={14} />
                          <span>Includes Video</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="gold-card rounded-xl p-4 transition-all duration-300 hover:border-[#C9A84C]/40">
                    <h4 className="text-white font-semibold mb-3">Similar Projects</h4>
                    <div className="space-y-2">
                      {projects
                        .filter(p => p.category === selectedProject.category && p.id !== selectedProject.id)
                        .slice(0, 3)
                        .map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedProject(p)}
                            className="w-full text-left px-3 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all duration-300 hover:scale-[1.02]"
                          >
                            <p className="text-white text-sm">{p.title}</p>
                            <p className="text-[#666666] text-xs">{p.client}</p>
                          </button>
                        ))}
                    </div>
                  </div>

                  <Link href="/contact" className="btn-gold w-full justify-center group">
                    Start a Project Like This
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main export with Suspense boundary
export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioLoading />}>
      <PortfolioContent />
    </Suspense>
  );
}