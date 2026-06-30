import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Generate a placeholder image with text
async function createPlaceholder(
  filename: string,
  text: string,
  width: number = 800,
  height: number = 600,
  color: string = '#1A1A1A'
) {
  const outputPath = path.join('public/images', filename);
  
  // Create a colored rectangle with text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <rect x="10%" y="10%" width="80%" height="80%" fill="#2A2A2A" rx="10"/>
      <text 
        x="50%" y="45%" 
        font-family="Arial" 
        font-size="36" 
        fill="#C9A84C" 
        text-anchor="middle"
        dominant-baseline="middle"
      >${text}</text>
      <text 
        x="50%" y="55%" 
        font-family="Arial" 
        font-size="16" 
        fill="#666666" 
        text-anchor="middle"
        dominant-baseline="middle"
      >Shalom Website</text>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`✅ Created placeholder: ${filename}`);
}

// List of required images
const images = [
  { name: 'project-wedding.jpg', text: 'Wedding Gala', color: '#1a0a0a' },
  { name: 'project-wedding-thumb.jpg', text: 'Wedding', width: 400, height: 300, color: '#1a0a0a' },
  { name: 'project-conference.jpg', text: 'Corporate Conference', color: '#0a1a2a' },
  { name: 'project-branding.jpg', text: 'Brand Identity', color: '#1a1a0a' },
  { name: 'project-tshirts.jpg', text: 'T-Shirt Printing', color: '#0a1a1a' },
  { name: 'project-launch.jpg', text: 'Product Launch', color: '#1a0a1a' },
  { name: 'project-billboard.jpg', text: 'Billboard Campaign', color: '#0a1a0a' },
  { name: 'project-graduation.jpg', text: 'Graduation Ceremony', color: '#0a0a1a' },
  { name: 'birtat.jpg', text: 'Restaurant Branding', color: '#1a0a0a' },
  { name: 'logo.png', text: 'SHALOM', color: '#0a0a0a' },
  { name: 'video-placeholder.jpg', text: 'Video Preview', width: 640, height: 360, color: '#1a1a1a' },
];

// Create team member placeholders
const teamMembers = [
  { name: 'solomon.jpg', text: 'Solomon Tesfaye', color: '#1a0a0a' },
  { name: 'rahel.jpg', text: 'Rahel Abebe', color: '#0a1a0a' },
  { name: 'michael.jpg', text: 'Michael Tadesse', color: '#0a0a1a' },
  { name: 'selamawit.jpg', text: 'Selamawit Girma', color: '#1a0a1a' },
];

async function createAllPlaceholders() {
  console.log('🖼️  Creating placeholder images...\n');
  
  // Create main images
  for (const img of images) {
    await createPlaceholder(
      img.name,
      img.text,
      img.width || 800,
      img.height || 600,
      img.color || '#1A1A1A'
    );
  }
  
  // Create team images
  for (const member of teamMembers) {
    await createPlaceholder(
      `team/${member.name}`,
      member.text,
      400,
      400,
      member.color
    );
  }
  
  console.log('\n✅ All placeholder images created successfully!');
}

createAllPlaceholders().catch(console.error);
