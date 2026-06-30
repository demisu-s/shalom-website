#!/bin/bash

echo "========================================"
echo "  SHALOM IMAGE OPTIMIZER"
echo "========================================"
echo ""
echo "1. Quick Optimize (default settings)"
echo "2. Advanced Optimize (specific folders)"
echo "3. Interactive CLI"
echo "4. Watch Mode"
echo ""
read -p "Select option (1-4): " choice

case $choice in
  1)
    npm run optimize-images
    ;;
  2)
    npm run optimize:advanced
    ;;
  3)
    npm run optimize:cli
    ;;
  4)
    npm run optimize:watch
    ;;
  *)
    echo "Invalid option"
    ;;
esac
