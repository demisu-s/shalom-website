export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: string;
  features: string[];
  packages?: Package[];
}

export type ServiceCategory = 'event-management' | 'printing' | 'advertising';

export interface Package {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
}

export type ProjectCategory = 'events' | 'printing' | 'advertising' | 'branding';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix: string;
}