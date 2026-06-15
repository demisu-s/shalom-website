import type { NavLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export const COMPANY_INFO = {
  name: 'Shalom Advertising & Event Organizer',
  shortName: 'Shalom',
  tagline: 'Where Every Event Becomes a Masterpiece',
  email: 'info@shalomevents.et',
  phone: '+251 911 234 567',
  phone2: '+251 911 765 432',
  address: 'Bole Road, Addis Ababa, Ethiopia',
  hours: 'Mon–Sat: 8:00 AM – 6:00 PM',
  social: {
    facebook: 'https://facebook.com/shalomevents',
    instagram: 'https://instagram.com/shalomevents',
    linkedin: 'https://linkedin.com/company/shalomevents',
    youtube: 'https://youtube.com/shalomevents',
    tiktok: 'https://tiktok.com/@shalomevents',
  },
};

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'event-management', label: 'Event Management' },
  { id: 'printing', label: 'Printing Services' },
  { id: 'advertising', label: 'Advertising' },
];


export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'events', label: 'Events' },
  { id: 'printing', label: 'Printing' },
  { id: 'advertising', label: 'Advertising' },
  { id: 'branding', label: 'Branding' },
];