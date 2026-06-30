import sharp from 'sharp';
import fs from 'fs';

const projects = [
  { name: 'project-wedding', title: 'Grand Wedding Gala', color: '#1a0a0a', emoji: '💒' },
  { name: 'project-conference', title: 'Corporate Conference', color: '#0a1a2a', emoji: '🏢' },
  { name: 'project-branding', title: 'Brand Identity', color: '#1a1a0a', emoji: '🎨' },
  { name: 'project-tshirts', title: 'T-Shirt Printing', color: '#0a1a1a', emoji: '👕' },
  { name: 'project-launch', title: 'Product Launch', color: '#1a0a1a', emoji: '🚀' },
  { name: 'project-billboard', title: 'Billboard Campaign', color: '#0a1a0a', emoji: '📢' },
  { name: 'project-graduation', title: 'Graduation Ceremony', color: '#0a0a1a', emoji: '🎓' },
  { name: 'birtat', title: 'Restaurant Branding', color: '#1a0a0a', emoji: '🍽️' },
];

async function createProjectImages() {
  console.log('🎨 Creating project images...\n');
  
  for (const project of projects) {
    // Check if image already exists
    const imagePath = `public/images/${project.name}.jpg`;
    if (fs.existsSync(imagePath)) {
      console.log(`⏭️  ${project.name}.jpg already exists, skipping...`);
      continue;
    }
    
    // Create SVG with project info
    const svg = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${project.color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect x="5%" y="5%" width="90%" height="90%" rx="10" fill="none" stroke="#C9A84C" stroke-width="2" stroke-opacity="0.3"/>
        
        <!-- Emoji/Icon -->
        <text x="400" y="250" font-size="80" text-anchor="middle">${project.emoji}</text>
        
        <!-- Title -->
        <text x="400" y="330" font-family="Arial, sans-serif" font-size="36" fill="#FFFFFF" text-anchor="middle" font-weight="bold">${project.title}</text>
        
        <!-- Subtitle -->
        <text x="400" y="370" font-family="Arial, sans-serif" font-size="18" fill="#C9A84C" text-anchor="middle">Shalom Project</text>
        
        <!-- Decorative line -->
        <line x1="300" y1="400" x2="500" y2="400" stroke="#C9A84C" stroke-width="1" stroke-opacity="0.5"/>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 85 })
      .toFile(imagePath);
    
    console.log(`✅ Created: ${project.name}.jpg`);
  }
  
  // Create thumbnail
  if (!fs.existsSync('public/images/project-wedding-thumb.jpg')) {
    await sharp('public/images/project-wedding.jpg')
      .resize(400, 300, { fit: 'cover' })
      .jpeg({ quality: 75 })
      .toFile('public/images/project-wedding-thumb.jpg');
    console.log('✅ Created: project-wedding-thumb.jpg');
  }
  
  console.log('\n✅ All project images created!');
}

createProjectImages().catch(console.error);
