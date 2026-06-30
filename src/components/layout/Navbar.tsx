'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, COMPANY_INFO } from '@/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-[#2A2A2A] translate-y-0'
          : 'bg-transparent -translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/images/logo.png"
                alt="Shalom Logo"
                fill
                className="object-contain"
                priority
                sizes="48px"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold gold-text leading-tight group-hover:text-[#F0C040] transition-colors duration-300">SHALOM</p>
              <p className="text-xs text-[#999999] leading-tight group-hover:text-[#C9A84C] transition-colors duration-300">Advertising & Event Organizer</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                  pathname === link.href
                    ? 'text-[#C9A84C] active'
                    : 'text-[#E5E5E5] hover:text-[#C9A84C]'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A84C] animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="hidden md:flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#F0C040] transition-all duration-300 hover:scale-105"
            >
              <Phone size={14} className="animate-pulse-slow" />
              <span className="hidden xl:inline">{COMPANY_INFO.phone}</span>
            </a>
            <Link 
              href="/contact" 
              className="hidden md:inline-flex btn-gold text-sm py-2 px-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#C9A84C]/25"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#C9A84C] hover:text-[#F0C040] transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} className="rotate-90 transition-transform duration-300" /> : <Menu size={24} className="transition-transform duration-300 hover:rotate-90" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-[#2A2A2A] animate-slide-down">
          <div className="px-4 py-6 space-y-1">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                  pathname === link.href
                    ? 'text-[#C9A84C] bg-[#1A1A1A]'
                    : 'text-[#E5E5E5] hover:text-[#C9A84C] hover:bg-[#1A1A1A]'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#2A2A2A]">
              <Link 
                href="/contact" 
                className="btn-gold w-full text-center block transition-all duration-300 hover:scale-[1.02]"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
