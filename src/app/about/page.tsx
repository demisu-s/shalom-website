/* eslint-disable react-hooks/purity */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import { teamMembers } from '@/data/teamMembers';
import { 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Heart,
  Sparkles,
  Briefcase,
  Star,
  Quote,
  Mail,
} from 'lucide-react';
import {
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

export default function AboutPage() {
  const [visibleMembers, setVisibleMembers] = useState<string[]>([]);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  // Stats data
  const stats = [
    { value: '15+', label: 'Years of Excellence', icon: <Award size={24} /> },
    { value: '500+', label: 'Events Delivered', icon: <Sparkles size={24} /> },
    { value: '98%', label: 'Client Satisfaction', icon: <Heart size={24} /> },
    { value: '50+', label: 'Team Members', icon: <Users size={24} /> },
  ];

  // Values data
  const values = [
    { title: 'Creativity', description: 'Pushing boundaries with innovative solutions', icon: '🎨' },
    { title: 'Excellence', description: 'Delivering nothing but the best', icon: '⭐' },
    { title: 'Integrity', description: 'Building trust through transparency', icon: '🤝' },
    { title: 'Passion', description: 'Loving what we do, doing what we love', icon: '🔥' },
  ];

  // Intersection Observer for team members
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-member-id');
            if (id && !visibleMembers.includes(id)) {
              setVisibleMembers(prev => [...prev, id]);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('[data-member-id]');
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
  }, [visibleMembers]);

  const getMemberEmoji = (name: string) => {
    if (name.includes('Solomon')) return '👨‍💼';
    if (name.includes('Rahel')) return '👩‍🎨';
    if (name.includes('Michael')) return '👨‍💻';
    if (name.includes('Selamawit')) return '👩‍🔧';
    return '👤';
  };

  const getMemberSocial = (name: string) => {
    const socials: Record<string, { linkedin: string; twitter: string; email: string }> = {
      'Solomon': { linkedin: '#', twitter: '#', email: '#' },
      'Rahel': { linkedin: '#', twitter: '#', email: '#' },
      'Michael': { linkedin: '#', twitter: '#', email: '#' },
      'Selamawit': { linkedin: '#', twitter: '#', email: '#' },
    };
    const firstName = name.split(' ')[0];
    return socials[firstName] || { linkedin: '#', twitter: '#', email: '#' };
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#C9A84C]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A84C]/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
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
              <Sparkles size={14} className="text-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-sm font-medium">About Us</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              About <span className="gold-text">Shalom</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Ethiopia&apos;s premier advertising and event management company, 
              delivering extraordinary experiences since 2024.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-[#1A1A1A] rounded-full px-4 py-2 flex items-center gap-2 border border-[#2A2A2A] hover:border-[#C9A84C]/30 transition-all duration-300 hover:scale-105">
                <Clock size={16} className="text-[#C9A84C]" />
                <span className="text-[#999999] text-sm">Est. 2024</span>
              </div>
              <div className="bg-[#1A1A1A] rounded-full px-4 py-2 flex items-center gap-2 border border-[#2A2A2A] hover:border-[#C9A84C]/30 transition-all duration-300 hover:scale-105">
                <MapPin size={16} className="text-[#C9A84C]" />
                <span className="text-[#999999] text-sm">Addis Ababa, Ethiopia</span>
              </div>
              <div className="bg-[#1A1A1A] rounded-full px-4 py-2 flex items-center gap-2 border border-[#2A2A2A] hover:border-[#C9A84C]/30 transition-all duration-300 hover:scale-105">
                <Award size={16} className="text-[#C9A84C]" />
                <span className="text-[#999999] text-sm">Award Winning</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision with Interactive Tabs */}
      <Section>
        <Container>
          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-8">
            {['mission', 'vision', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'mission' | 'vision' | 'values')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab
                    ? 'bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/25'
                    : 'bg-[#1A1A1A] text-[#999999] hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C]/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="gold-card rounded-xl p-8 transition-all duration-500 hover:border-[#C9A84C]/40 hover:shadow-2xl hover:shadow-[#C9A84C]/10 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 via-[#C9A84C]/0 to-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className={`text-5xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  activeTab === 'mission' ? 'text-[#C9A84C]' : 'text-white/30'
                }`}>
                  {activeTab === 'mission' ? '🎯' : activeTab === 'vision' ? '👁️' : '💎'}
                </div>
                <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  activeTab === 'mission' ? 'text-[#C9A84C]' : 'text-white'
                }`}>
                  {activeTab === 'mission' ? 'Our Mission' : activeTab === 'vision' ? 'Our Vision' : 'Our Values'}
                </h2>
                
                {activeTab === 'mission' && (
                  <p className="text-[#CCCCCC] text-lg leading-relaxed">
                    To create unforgettable experiences that exceed expectations, 
                    combining creativity, precision, and passion in every event 
                    and advertising campaign we deliver.
                  </p>
                )}
                
                {activeTab === 'vision' && (
                  <p className="text-[#CCCCCC] text-lg leading-relaxed">
                    To be Ethiopia&apos;s most trusted and innovative event management 
                    and advertising company, setting new standards of excellence in the industry.
                  </p>
                )}
                
                {activeTab === 'values' && (
                  <div className="grid grid-cols-2 gap-4">
                    {values.map((value, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#1A1A1A] rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-[#2A2A2A] hover:shadow-lg hover:shadow-[#C9A84C]/10 border border-transparent hover:border-[#C9A84C]/30"
                      >
                        <div className="text-3xl mb-2">{value.icon}</div>
                        <h4 className="text-white text-sm font-semibold mb-1">{value.title}</h4>
                        <p className="text-[#999999] text-xs">{value.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Stats/Info Card */}
            <div className="gold-card rounded-xl p-8 transition-all duration-500 hover:border-[#C9A84C]/40 hover:shadow-2xl hover:shadow-[#C9A84C]/10 group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C9A84C] group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/20">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Why Choose Us</h3>
                    <p className="text-[#999999] text-sm">What makes us different</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#C9A84C]/20 transition-colors">
                      <Star size={12} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold group-hover/item:text-[#C9A84C] transition-colors">15+ Years Experience</h4>
                      <p className="text-[#999999] text-xs">Proven track record of excellence</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#C9A84C]/20 transition-colors">
                      <Users size={12} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold group-hover/item:text-[#C9A84C] transition-colors">Expert Team</h4>
                      <p className="text-[#999999] text-xs">Dedicated professionals at your service</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#C9A84C]/20 transition-colors">
                      <Sparkles size={12} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold group-hover/item:text-[#C9A84C] transition-colors">Innovative Solutions</h4>
                      <p className="text-[#999999] text-xs">Creative approaches to every challenge</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#C9A84C]/20 transition-colors">
                      <Heart size={12} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold group-hover/item:text-[#C9A84C] transition-colors">Client First</h4>
                      <p className="text-[#999999] text-xs">Your satisfaction is our priority</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-1.5 mb-4 border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors duration-300">
              <Users size={14} className="text-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="gold-text">Team</span>
            </h2>
            <p className="text-[#999999] max-w-2xl mx-auto">
              A dedicated team of professionals passionate about bringing your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers && teamMembers.map((member, index) => {
              const isVisible = visibleMembers.includes(member.id);
              const isHovered = hoveredMember === member.id;
              const social = getMemberSocial(member.name);

              return (
                <div 
                  key={member.id}
                  data-member-id={member.id}
                  className={`gold-card rounded-xl p-6 text-center transition-all duration-700 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } hover:border-[#C9A84C]/40 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#C9A84C]/10 group relative overflow-hidden cursor-pointer`}
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 via-[#C9A84C]/0 to-[#C9A84C]/0 transition-all duration-700 ${
                    isHovered ? 'from-[#C9A84C]/5 via-[#C9A84C]/10 to-[#C9A84C]/5' : ''
                  }`} />

                  <div className="relative z-10">
                    <div className={`w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-transparent flex items-center justify-center text-5xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#C9A84C]/20 ${
                      isHovered ? 'scale-110 shadow-xl shadow-[#C9A84C]/20' : ''
                    }`}>
                      <span className="transition-transform duration-500 group-hover:rotate-12">
                        {getMemberEmoji(member.name)}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-bold text-white mb-1 transition-colors duration-300 group-hover:text-[#C9A84C] ${
                      isHovered ? 'text-[#C9A84C]' : ''
                    }`}>
                      {member.name}
                    </h3>
                    <p className="text-[#C9A84C] text-sm font-medium mb-3">
                      {member.role}
                    </p>
                    
                    <p className="text-[#999999] text-sm mb-4 line-clamp-2">
                      {member.bio}
                    </p>

                    {/* Social Icons */}
                    <div className={`flex justify-center gap-3 transition-all duration-500 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <a 
                        href={social.linkedin} 
                        className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#999999] hover:bg-[#C9A84C] hover:text-black transition-all duration-300 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin size={16} />
                      </a>
                      <a 
                        href={social.twitter} 
                        className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#999999] hover:bg-[#C9A84C] hover:text-black transition-all duration-300 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter size={16} />
                      </a>
                      <a 
                        href={`mailto:${social.email}`} 
                        className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#999999] hover:bg-[#C9A84C] hover:text-black transition-all duration-300 hover:scale-110"
                      >
                        <Mail size={16} />
                      </a>
                    </div>

                    {/* Quote icon that appears on hover */}
                    <div className={`absolute top-3 right-3 transition-all duration-500 ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}>
                      <Quote size={20} className="text-[#C9A84C]/30" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Statistics Section */}
      <div id="stats-section">
        <Section className="bg-[#0A0A0A]">
          <Container>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-1.5 mb-4 border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors duration-300">
                <Award size={14} className="text-[#C9A84C] animate-pulse" />
                <span className="text-[#C9A84C] text-sm font-medium">Our Impact</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                By the <span className="gold-text">Numbers</span>
              </h2>
              <p className="text-[#999999] max-w-2xl mx-auto">
                The results that speak for themselves
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center transition-all duration-500 transform hover:scale-105 group gold-card rounded-xl p-6"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#C9A84C] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/20">
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold gold-text transition-all duration-1000 ${
                    animateStats ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}>
                    {stat.value}
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