#!/bin/bash

echo "🔍 Checking for required images..."
echo ""

REQUIRED_IMAGES=(
  "project-wedding.jpg"
  "project-wedding-thumb.jpg"
  "project-conference.jpg"
  "project-branding.jpg"
  "project-tshirts.jpg"
  "project-launch.jpg"
  "project-billboard.jpg"
  "project-graduation.jpg"
  "birtat.jpg"
  "logo.png"
  "video-placeholder.jpg"
)

MISSING=0
for img in "${REQUIRED_IMAGES[@]}"; do
  if [ -f "public/images/$img" ]; then
    echo "✅ $img exists"
  else
    echo "❌ $img is missing"
    MISSING=$((MISSING + 1))
  fi
done

echo ""
echo "📊 Summary: $MISSING images missing"

if [ $MISSING -gt 0 ]; then
  echo ""
  echo "💡 To fix, run:"
  echo "   npx ts-node scripts/create-placeholders.ts"
  echo "   npm run optimize-images"
fi
