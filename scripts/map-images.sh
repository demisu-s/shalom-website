#!/bin/bash

echo "📸 Mapping existing images to expected filenames..."

cd public/images

# Copy from printingImages to expected names
# If you have specific images for each project, rename them
# For now, we'll copy the first few images as placeholders

# Find the first few images
IMAGES=($(ls *.jpg 2>/dev/null | head -10))

if [ ${#IMAGES[@]} -gt 0 ]; then
    # Copy first image as project-wedding
    cp "${IMAGES[0]}" project-wedding.jpg 2>/dev/null
    echo "✅ Created project-wedding.jpg"
    
    # Copy second image as project-conference
    if [ ${#IMAGES[@]} -gt 1 ]; then
        cp "${IMAGES[1]}" project-conference.jpg 2>/dev/null
        echo "✅ Created project-conference.jpg"
    fi
    
    # Copy third image as project-branding
    if [ ${#IMAGES[@]} -gt 2 ]; then
        cp "${IMAGES[2]}" project-branding.jpg 2>/dev/null
        echo "✅ Created project-branding.jpg"
    fi
    
    # Copy fourth image as project-tshirts
    if [ ${#IMAGES[@]} -gt 3 ]; then
        cp "${IMAGES[3]}" project-tshirts.jpg 2>/dev/null
        echo "✅ Created project-tshirts.jpg"
    fi
    
    # Copy fifth image as project-launch
    if [ ${#IMAGES[@]} -gt 4 ]; then
        cp "${IMAGES[4]}" project-launch.jpg 2>/dev/null
        echo "✅ Created project-launch.jpg"
    fi
    
    # Copy sixth image as project-billboard
    if [ ${#IMAGES[@]} -gt 5 ]; then
        cp "${IMAGES[5]}" project-billboard.jpg 2>/dev/null
        echo "✅ Created project-billboard.jpg"
    fi
    
    # Copy seventh image as project-graduation
    if [ ${#IMAGES[@]} -gt 6 ]; then
        cp "${IMAGES[6]}" project-graduation.jpg 2>/dev/null
        echo "✅ Created project-graduation.jpg"
    fi
    
    # Copy eighth image as birtat
    if [ ${#IMAGES[@]} -gt 7 ]; then
        cp "${IMAGES[7]}" birtat.jpg 2>/dev/null
        echo "✅ Created birtat.jpg"
    fi
fi

# Create thumbnail versions
if [ -f project-wedding.jpg ]; then
    echo "📸 Creating thumbnails..."
    # You can use imagemagick or sharp for thumbnails
    # For now, just copy the same image
    cp project-wedding.jpg project-wedding-thumb.jpg 2>/dev/null
    echo "✅ Created project-wedding-thumb.jpg"
fi

echo "✅ Image mapping complete!"
cd ../..
