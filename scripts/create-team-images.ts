import sharp from 'sharp';
import fs from 'fs';

const teamMembers = [
  { name: 'solomon', role: 'CEO' },
  { name: 'rahel', role: 'Creative Director' },
  { name: 'michael', role: 'Head of Events' },
  { name: 'selamawit', role: 'Print Manager' }
];

async function createTeamImages() {
  console.log('👥 Creating team member images...\n');
  
  for (const member of teamMembers) {
    const svg = `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1A1A1A"/>
        <circle cx="200" cy="160" r="80" fill="#2A2A2A" stroke="#C9A84C" stroke-width="3"/>
        <text x="200" y="170" font-family="Arial" font-size="64" fill="#C9A84C" text-anchor="middle">${member.name.charAt(0).toUpperCase()}</text>
        <text x="200" y="260" font-family="Arial" font-size="24" fill="#FFFFFF" text-anchor="middle" font-weight="bold">${member.name.charAt(0).toUpperCase() + member.name.slice(1)}</text>
        <text x="200" y="290" font-family="Arial" font-size="16" fill="#999999" text-anchor="middle">${member.role}</text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 80 })
      .toFile(`public/images/team/${member.name}.jpg`);
    
    console.log(`✅ Created: ${member.name}.jpg`);
  }
  
  console.log('\n✅ All team images created!');
}

createTeamImages().catch(console.error);
