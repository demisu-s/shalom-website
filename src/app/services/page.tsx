'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import { SERVICE_CATEGORIES } from '@/constants';
import { services } from '@/data/services';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Printer, 
  Megaphone,
  ChevronDown,
  X,
  Clock,
  Award,
  Users,
  Zap
} from 'lucide-react';
import type { Service } from '@/types';

export default function ServicesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredServices = services.filter(service => 
    activeCategory === 'all' ? true : service.category === activeCategory
  );

  // Map service category to portfolio category
  const getPortfolioCategory = (serviceCategory: string): string => {
    const categoryMap: Record<string, string> = {
      'event-management': 'events',
      'printing': 'printing',
      'advertising': 'advertising',
    };
    return categoryMap[serviceCategory] || 'all';
  };

  const handleViewDetails = (service: Service) => {
    const portfolioCategory = getPortfolioCategory(service.category);
    router.push(`/portfolio?category=${portfolioCategory}`);
  };

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

  const togglePackages = (serviceId: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const getServiceStats = (service: Service) => {
    const stats = [
      { icon: <Users size={14} />, label: `${service.packages?.length || 0} Packages` },
      { icon: <Check size={14} />, label: `${service.features.length} Features` },
    ];
    if (service.packages?.some(p => p.popular)) {
      stats.push({ icon: <Award size={14} />, label: 'Popular Choice' });
    }
    return stats;
  };

  return (
    <>
      {/* Hero Section with Interactive Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#C9A84C]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A84C]/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-1.5 mb-6 animate-slide-down border border-[#C9A84C]/20">
              <Sparkles size={14} className="text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium">Premium Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Our <span className="gold-text">Services</span>
            </h1>
            
            <p className="text-[#CCCCCC] text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Comprehensive solutions tailored to bring your vision to life. 
              From event planning to printing and advertising, we deliver excellence.
            </p>
            
            {/* Interactive Category Tags */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                    activeCategory === cat.id
                      ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25'
                      : 'bg-[#1A1A1A] text-[#999999] hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C]/30'
                  }`}
                >
                  <span className="relative z-10">
                    {cat.label}
                    {activeCategory === cat.id && (
                      <span className="ml-2 inline-block animate-pulse">●</span>
                    )}
                  </span>
                  {activeCategory !== cat.id && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/5 to-[#C9A84C]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid - Interactive Cards */}
      <Section className="pt-0">
        <Container>
          <div className="space-y-8">
            {filteredServices.map((service, index) => {
              const isExpanded = expandedPackages[service.id] || false;
              const isHovered = hoveredCard === service.id;
              const stats = getServiceStats(service);

              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`gold-card rounded-2xl overflow-hidden bg-gradient-to-br ${getCategoryColor(service.category)} transition-all duration-500 transform ${
                    isHovered ? 'scale-[1.01] shadow-2xl shadow-[#C9A84C]/10' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="p-8">
                    {/* Header with Interactive Icon */}
                    <div className="flex items-start gap-4 mb-6 cursor-pointer" onClick={() => setSelectedService(service.id)}>
                      <div className="relative">
                        <div className={`text-5xl transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                          {service.icon}
                        </div>
                        <div className={`absolute -inset-2 rounded-full bg-[#C9A84C]/10 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                          {service.title}
                          <span className="text-xs font-normal text-[#666] bg-[#1A1A1A] px-2 py-0.5 rounded-full">
                            {service.category.split('-').join(' ')}
                          </span>
                        </h2>
                        <p className="text-[#999999]">{service.description}</p>
                      </div>
                    </div>

                    {/* Service Stats - Interactive */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {stats.map((stat, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center gap-1.5 text-xs text-[#999] bg-[#1A1A1A]/50 px-3 py-1.5 rounded-full border border-[#2A2A2A] transition-all duration-300 ${
                            isHovered ? 'border-[#C9A84C]/30' : ''
                          }`}
                        >
                          {stat.icon}
                          <span>{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features with Interactive Toggle */}
                    <div className="mb-6">
                      <button
                        onClick={() => togglePackages(service.id)}
                        className="flex items-center gap-2 text-white font-semibold hover:text-[#C9A84C] transition-colors group"
                      >
                        <Check size={18} className="text-[#C9A84C]" />
                        <span>Key Features</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 transition-all duration-500 overflow-hidden ${
                        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        {service.features.map((feature) => (
                          <div 
                            key={feature} 
                            className="flex items-center gap-2 text-[#CCCCCC] text-sm bg-[#1A1A1A]/30 px-3 py-1.5 rounded-lg border border-[#2A2A2A]/50 transition-all duration-300 hover:border-[#C9A84C]/30 hover:bg-[#1A1A1A]/50"
                          >
                            <Check size={12} className="text-[#C9A84C] flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packages with Interactive Cards */}
                    {service.packages && service.packages.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-white font-semibold mb-4">
                          <Sparkles size={18} className="text-[#C9A84C]" />
                          <span>Pricing Packages</span>
                          <span className="text-xs text-[#666] font-normal">({service.packages.length})</span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          {service.packages.map((pkg) => (
                            <div 
                              key={pkg.name}
                              className={`group rounded-xl p-5 transition-all duration-500 transform hover:-translate-y-1 ${
                                pkg.popular 
                                  ? 'bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border-2 border-[#C9A84C] shadow-lg shadow-[#C9A84C]/10' 
                                  : 'bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A84C]/30'
                              }`}
                            >
                              {pkg.popular && (
                                <div className="flex items-center gap-1.5 text-[10px] text-[#C9A84C] font-semibold mb-2 uppercase tracking-wider animate-pulse">
                                  <Zap size={12} />
                                  Most Popular
                                </div>
                              )}
                              <h4 className="text-xl font-bold text-white mb-1 group-hover:text-[#C9A84C] transition-colors">
                                {pkg.name}
                              </h4>
                              <div className="text-2xl font-bold gold-text mb-3">
                                {pkg.price}
                              </div>
                              <ul className="space-y-1.5 mb-4">
                                {pkg.features.slice(0, 4).map((feature) => (
                                  <li key={feature} className="flex items-start gap-2 text-sm text-[#CCCCCC]">
                                    <Check size={12} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                                    <span className="group-hover:text-white transition-colors">{feature}</span>
                                  </li>
                                ))}
                                {pkg.features.length > 4 && (
                                  <li className="text-xs text-[#666] pl-5">+{pkg.features.length - 4} more</li>
                                )}
                              </ul>
                              <Link 
                                href="/contact" 
                                className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 relative overflow-hidden ${
                                  pkg.popular 
                                    ? 'bg-[#C9A84C] text-black hover:bg-[#D4B85C] shadow-lg shadow-[#C9A84C]/20' 
                                    : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] border border-[#3A3A3A]'
                                }`}
                              >
                                <span className="relative z-10">Get Started</span>
                                <span className={`absolute inset-0 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/10 to-[#C9A84C]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${pkg.popular ? 'opacity-100' : 'opacity-0'}`} />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#2A2A2A]">
                      <Link 
                        href={`/contact?service=${service.id}`}
                        className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#D4B85C] transition-colors group"
                      >
                        <span>Get Custom Quote</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button
                        onClick={() => handleViewDetails(service)}
                        className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#999] transition-colors group"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section with Interactive Elements */}
          <div className="mt-16 text-center gold-card rounded-2xl p-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/5 via-transparent to-[#C9A84C]/5 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                Need a Custom Solution?
                <span className="text-2xl animate-bounce">✨</span>
              </h3>
              <p className="text-[#999999] mb-6 max-w-2xl mx-auto">
                Let&apos;s discuss your specific requirements and create a tailored package that fits your needs and budget.
              </p>
              <Link href="/contact" className="btn-gold inline-flex group relative overflow-hidden">
                <span className="relative z-10">Get a Custom Quote</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/0 via-white/20 to-[#C9A84C]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}