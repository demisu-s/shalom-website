@echo off
echo ========================================
echo   SHALOM IMAGE OPTIMIZER
echo ========================================
echo.
echo 1. Quick Optimize (default settings)
echo 2. Advanced Optimize (specific folders)
echo 3. Interactive CLI
echo 4. Watch Mode
echo.
set /p choice="Select option (1-4): "

if "%choice%"=="1" (
  npm run optimize-images
) else if "%choice%"=="2" (
  npm run optimize:advanced
) else if "%choice%"=="3" (
  npm run optimize:cli
) else if "%choice%"=="4" (
  npm run optimize:watch
) else (
  echo Invalid option
)

pause
