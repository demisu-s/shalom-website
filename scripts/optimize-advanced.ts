import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

interface ProcessFolder {
  path: string;
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

const folders: ProcessFolder[] = [
  { path: './public/images', maxWidth: 800, maxHeight: 600, quality: 80 },
  { path: './public/images/team', maxWidth: 400, maxHeight: 400, quality: 85 },
  { path: './public/images/projects', maxWidth: 800, maxHeight: 600, quality: 85 },
];

async function processFolder(folder: ProcessFolder): Promise<void> {
  console.log(`\n📁 Processing: ${folder.path}`);
  
  if (!fs.existsSync(folder.path)) {
    console.log(`❌ Folder not found: ${folder.path}`);
    return;
  }
  
  const files = fs.readdirSync(folder.path);
  const images = files.filter(f => f.match(/\.(jpg|jpeg|png)$/i));
  
  if (images.length === 0) {
    console.log(`⚠️  No images found in ${folder.path}`);
    return;
  }
  
  const optimizedDir = path.join(folder.path, 'optimized');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  let optimized = 0;
  for (const file of images) {
    const inputPath = path.join(folder.path, file);
    const outputPath = path.join(optimizedDir, file);
    
    try {
      await sharp(inputPath)
        .resize(folder.maxWidth, folder.maxHeight, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ 
          quality: folder.quality, 
          progressive: true 
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ ${file}: ${(stats.size / 1024).toFixed(1)}KB`);
      optimized++;
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error);
    }
  }
  
  console.log(`✅ Optimized ${optimized} images in ${folder.path}`);
}

async function processAllFolders(): Promise<void> {
  console.log('🚀 Starting advanced image optimization...\n');
  
  for (const folder of folders) {
    await processFolder(folder);
  }
  
  console.log('\n✅ All folders processed successfully!');
}

processAllFolders().catch(console.error);
