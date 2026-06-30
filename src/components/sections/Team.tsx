'use client';

import Section from './Section';
import Container from '../shared/Container';
import SectionHeader from '../shared/SectionHeader';
import { teamMembers } from '@/data/teamMembers';
import Image from 'next/image';

export default function Team() {
  return (
    <Section>
      <Container>
        <SectionHeader
          badge="Our Team"
          title="Meet the Experts Behind Shalom"
          subtitle="A dedicated team of professionals committed to delivering excellence in every project."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            // Get optimized team image path
            const imagePath = member.image 
              ? member.image.replace('/images/', '/images/optimized/')
              : '/images/optimized/team-placeholder.jpg';
              
            return (
              <div key={member.id} className="gold-card rounded-xl p-6 text-center group hover:border-[#C9A84C]/40 transition-all duration-300">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={imagePath}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-[#C9A84C] text-sm mb-3">{member.role}</p>
                <p className="text-[#999999] text-sm">{member.bio}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}