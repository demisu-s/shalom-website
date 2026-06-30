export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  features: string[];
  packages?: {
    name: string;
    price: string;
    features: string[];
    popular?: boolean;
  }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  videoUrl?: string;
  thumbnail?: string;
  tags: string[];
  year: string;
}

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
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}


export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}