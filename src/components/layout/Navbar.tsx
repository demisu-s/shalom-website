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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-[#2A2A2A]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Shalom Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold gold-text leading-tight">SHALOM</p>
              <p className="text-xs text-[#999999] leading-tight">Advertising & Event Organizer</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#C9A84C] active'
                    : 'text-[#E5E5E5] hover:text-[#C9A84C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="hidden md:flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#F0C040] transition-colors"
            >
              <Phone size={14} />
              <span className="hidden xl:inline">{COMPANY_INFO.phone}</span>
            </a>
            <Link href="/contact" className="hidden md:inline-flex btn-gold text-sm py-2 px-5">
              Get a Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#C9A84C] hover:text-[#F0C040]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-[#2A2A2A]">
          <div className="px-4 py-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#C9A84C] bg-[#1A1A1A]'
                    : 'text-[#E5E5E5] hover:text-[#C9A84C] hover:bg-[#1A1A1A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#2A2A2A]">
              <Link href="/contact" className="btn-gold w-full text-center block">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}