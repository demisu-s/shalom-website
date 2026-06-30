import sharp, { FitEnum } from "sharp";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

interface ImageConfig {
  width: number;
  height: number;
  quality: number;
fit?: keyof import("sharp").FitEnum;
  position?: string;
}

interface OptimizationResult {
  filename: string;
  originalSize: number;
  optimizedSize: number;
  compression: string;
  width: number;
  height: number;
}

interface Config {
  inputDir: string;
  outputDir: string;
  jpegQuality: number;
  pngQuality: number;
  maxWidth: number;
  maxHeight: number;
  maxFileSize: number;
}

interface Rule {
  width: number;
  height: number;
  quality: number;
}

const CONFIG: Config = {
  inputDir: './public/images',
  outputDir: './public/images/optimized',
  jpegQuality: 80,
  pngQuality: 80,
  maxWidth: 1200,
  maxHeight: 1200,
  maxFileSize: 200 * 1024,
};

const RULES: Record<string, Rule> = {
  'project-wedding': { width: 800, height: 600, quality: 85 },
  'project-conference': { width: 800, height: 600, quality: 85 },
  'project-branding': { width: 800, height: 600, quality: 85 },
  'project-tshirts': { width: 800, height: 600, quality: 85 },
  'project-launch': { width: 800, height: 600, quality: 85 },
  'project-billboard': { width: 800, height: 600, quality: 85 },
  'project-graduation': { width: 800, height: 600, quality: 85 },
  'birtat': { width: 800, height: 600, quality: 85 },
  'logo': { width: 600, height: 600, quality: 90 },
  'wedding-preview-thumb': { width: 640, height: 360, quality: 80 },
  'video-placeholder': { width: 640, height: 360, quality: 80 },
  'team': { width: 400, height: 400, quality: 85 },
};

function getSizeForImage(filename: string): Rule {
  const name = filename.replace(/\.[^.]+$/, '').toLowerCase();
  const rule = RULES[name];
  
  if (rule) {
    return rule;
  }
  
  return {
    width: 800,
    height: 600,
    quality: 80
  };
}

async function optimizeImage(
  filePath: string, 
  outputPath: string
): Promise<OptimizationResult | null> {
  const filename = path.basename(filePath);
  const size = getSizeForImage(filename);
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let width = metadata.width || size.width;
    let height = metadata.height || size.height;
    let needsResize = false;
    
    if ((metadata.width || 0) > size.width || (metadata.height || 0) > size.height) {
      needsResize = true;
      width = size.width;
      height = size.height;
    }
    
    let pipeline = image;
    
    if (needsResize) {
      pipeline = pipeline.resize(width, height, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      });
    }
    
    const format = metadata.format || 'jpeg';
    
    if (format === 'jpeg') {
      pipeline = pipeline.jpeg({
        quality: size.quality || CONFIG.jpegQuality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:2:0'
      });
    } else if (format === 'png') {
      pipeline = pipeline.png({
        quality: size.quality || CONFIG.pngQuality,
        progressive: true,
        compressionLevel: 9
      });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({
        quality: size.quality || 80,
        alphaQuality: 80
      });
    }
    
    await pipeline.toFile(outputPath);
    
    const stats = await stat(outputPath);
    if (stats.size > CONFIG.maxFileSize) {
      console.log(`⚠️  ${filename} is ${Math.round(stats.size / 1024)}KB (target: ${CONFIG.maxFileSize / 1024}KB)`);
      
      if (stats.size > CONFIG.maxFileSize * 1.5) {
        console.log(`🔄 Re-optimizing ${filename} with lower quality...`);
        await sharp(filePath)
          .resize(width, height, { fit: 'cover' })
          .jpeg({ quality: 70, progressive: true })
          .toFile(outputPath);
      }
    }
    
    return {
      filename,
      originalSize: metadata.size || 0,
      optimizedSize: stats.size,
      compression: ((1 - stats.size / (metadata.size || 1)) * 100).toFixed(1),
      width,
      height
    };
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
    return null;
  }
}

async function optimizeAllImages(): Promise<void> {
  console.log('🚀 Starting image optimization...\n');
  
  try {
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    
    const files = await readdir(CONFIG.inputDir);
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|webp)$/i) && 
      !file.includes('optimized')
    );
    
    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }
    
    console.log(`📸 Found ${imageFiles.length} images\n`);
    
    const results: OptimizationResult[] = [];
    
    for (const file of imageFiles) {
      const inputPath = path.join(CONFIG.inputDir, file);
      const outputPath = path.join(CONFIG.outputDir, file);
      
      console.log(`📷 Processing: ${file}`);
      const result = await optimizeImage(inputPath, outputPath);
      
      if (result) {
        results.push(result);
        console.log(`✅ ${file}: ${result.originalSize} → ${result.optimizedSize} (${result.compression}% reduction)`);
        console.log(`   📐 ${result.width}x${result.height}\n`);
      }
    }
    
    console.log('\n📊 Optimization Summary');
    console.log('═══════════════════════════════════');
    console.log(`✅ ${results.length} images optimized`);
    
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalCompression = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
    
    console.log(`📦 Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📦 Optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Total compression: ${totalCompression}%`);
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
    
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

optimizeAllImages();
