import fs from 'fs';
import { exec } from 'child_process';

interface WatchOptions {
  watchDir: string;
  debounceTime: number;
}

const WATCH_CONFIG: WatchOptions = {
  watchDir: './public/images',
  debounceTime: 1000,
};

let timeoutId: NodeJS.Timeout | null = null;

console.log('👀 Watching for new images...');

fs.watch(WATCH_CONFIG.watchDir, (eventType: string, filename: string | null) => {
  if (!filename) return;
  
  if (!filename.match(/\.(jpg|jpeg|png)$/i)) return;
  
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  timeoutId = setTimeout(() => {
    console.log(`📸 New image detected: ${filename}`);
    console.log('🔄 Running optimization...');
    
    exec('npx ts-node scripts/optimize-images.ts', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(stdout);
      timeoutId = null;
    });
  }, WATCH_CONFIG.debounceTime);
});

console.log(`✅ Watching for changes in: ${WATCH_CONFIG.watchDir}/`);
console.log('Press Ctrl+C to stop');
