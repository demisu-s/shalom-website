
import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import { teamMembers } from '@/data/teamMembers';

export default function PortfolioPage() {
  return (
    <>
      <Container>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Our <span className="gold-text">Portfolio</span>
        </h1>
        <p className="text-[#CCCCCC] text-lg mb-12">
          Explore our diverse range of successful projects and campaigns that showcase our creativity and expertise in event management and advertising.
        </p>
      </Container>
    </>
  );
}