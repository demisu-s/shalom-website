import Section from '@/components/sections/Section';
import Container from '@/components/shared/Container';
import { teamMembers } from '@/data/teamMembers';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0D0A00] to-black" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="gold-text">Shalom</span>
            </h1>
            <p className="text-[#CCCCCC] text-lg">
              Ethiopia&apos;s premier advertising and event management company, 
              delivering extraordinary experiences since 2009.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="gold-card rounded-xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-[#CCCCCC]">
                To create unforgettable experiences that exceed expectations, 
                combining creativity, precision, and passion in every event 
                and advertising campaign we deliver.
              </p>
            </div>
            <div className="gold-card rounded-xl p-8">
              <div className="text-4xl mb-4">👁️</div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-[#CCCCCC]">
                To be Ethiopia&apos;s most trusted and innovative event management 
                and advertising company, setting new standards of excellence in the industry.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="gold-text">Team</span>
            </h2>
            <p className="text-[#999999] max-w-2xl mx-auto">
              A dedicated team of professionals passionate about bringing your vision to life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers && teamMembers.map((member) => (
              <div key={member.id} className="gold-card rounded-xl p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-transparent flex items-center justify-center">
                  <span className="text-3xl">
                    {member.name.includes('Solomon') && '👨‍💼'}
                    {member.name.includes('Rahel') && '👩‍🎨'}
                    {member.name.includes('Michael') && '👨‍💻'}
                    {member.name.includes('Selamawit') && '👩‍🔧'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#C9A84C] text-sm mb-3">{member.role}</p>
                <p className="text-[#999999] text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}