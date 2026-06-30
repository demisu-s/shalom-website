import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Shalom Advertising & Event Organizer | Addis Ababa, Ethiopia',
    template: '%s | Shalom Advertising & Event Organizer',
  },
  description: "Ethiopia's premier advertising and event management company. We specialize in wedding events, corporate events, printing services, branding, and advertising campaigns in Addis Ababa.",
  keywords: ['event organizer Ethiopia', 'advertising Addis Ababa', 'wedding planner Ethiopia', 'printing services Ethiopia', 'corporate events Addis Ababa', 'Shalom events'],
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    url: 'https://shalomevents.et',
    siteName: 'Shalom Advertising & Event Organizer',
    title: 'Shalom Advertising & Event Organizer | Addis Ababa, Ethiopia',
    description: 'Premium event management and advertising services in Ethiopia',
    images: [{ url: '/images/logo.png', width: 800, height: 800, alt: 'Shalom Logo' }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen animate-fade-in">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
