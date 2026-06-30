#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

interface CliOptions {
  inputDir: string;
  outputDir: string;
  width: number;
  height: number;
  quality: number;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🖼️  Image Optimizer CLI Tool');
console.log('═══════════════════════════════════\n');

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main(): Promise<void> {
  const inputDir = await question('📁 Enter image directory (default: public/images): ') || './public/images';
  const outputDir = path.join(inputDir, 'optimized');
  
  const widthStr = await question('📐 Enter max width (default: 800): ');
  const heightStr = await question('📐 Enter max height (default: 600): ');
  const qualityStr = await question('🎯 Enter quality (1-100, default: 80): ');
  
  const options: CliOptions = {
    inputDir,
    outputDir,
    width: parseInt(widthStr) || 800,
    height: parseInt(heightStr) || 600,
    quality: parseInt(qualityStr) || 80
  };
  
  await optimizeImages(options);
}

async function optimizeImages(options: CliOptions): Promise<void> {
  console.log('\n🚀 Starting optimization...\n');
  
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(options.inputDir);
  const imageFiles = files.filter(file => 
    file.match(/\.(jpg|jpeg|png)$/i) && 
    !file.includes('optimized')
  );
  
  if (imageFiles.length === 0) {
    console.log('❌ No images found to optimize.');
    rl.close();
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} images\n`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(options.inputDir, file);
    const outputPath = path.join(options.outputDir, file);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      
      await sharp(inputPath)
        .resize(options.width, options.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ 
          quality: options.quality, 
          progressive: true 
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ ${file}: ${(stats.size / 1024).toFixed(1)}KB`);
      
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error);
    }
  }
  
  console.log('\n✅ All images optimized successfully!');
  console.log(`📁 Optimized images saved to: ${options.outputDir}`);
  rl.close();
}

main().catch(console.error);
