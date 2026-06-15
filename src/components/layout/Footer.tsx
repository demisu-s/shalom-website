import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { NAV_LINKS, COMPANY_INFO } from '@/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image src="/images/logo.png" alt="Shalom Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-xl font-bold gold-text">SHALOM</p>
                <p className="text-xs text-[#999999]">Advertising & Event Organizer</p>
              </div>
            </Link>
            <p className="text-[#999999] text-sm leading-relaxed mb-6">
              Ethiopia&apos;s premier advertising and event management company, delivering extraordinary experiences since 2009.
            </p>
            <div className="flex gap-4">
              <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <FaFacebookF size={16} />
              </a>
              <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <FaInstagram size={16} />
              </a>
              <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <FaLinkedinIn size={16} />
              </a>
              <a href={COMPANY_INFO.social.youtube} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#999999] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#999999] hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 transition-all overflow-hidden inline-block">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {['Wedding Events', 'Corporate Events', 'T-Shirt Printing', 'Banner Printing', 'Brand Promotion', 'Outdoor Advertising', 'Marketing Campaigns'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-[#999999] hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 transition-all overflow-hidden inline-block">→</span>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#999999] hover:text-[#C9A84C] transition-colors text-sm block">{COMPANY_INFO.phone}</a>
                  <a href={`tel:${COMPANY_INFO.phone2}`} className="text-[#999999] hover:text-[#C9A84C] transition-colors text-sm block">{COMPANY_INFO.phone2}</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#999999] hover:text-[#C9A84C] transition-colors text-sm">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span className="text-[#999999] text-sm">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span className="text-[#999999] text-sm">{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666666] text-sm">
            © {year} Shalom Advertising & Event Organizer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#666666] hover:text-[#C9A84C] text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[#666666] hover:text-[#C9A84C] text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}