import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import StatsSection from '@/components/sections/StatsSection';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <StatsSection />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
}