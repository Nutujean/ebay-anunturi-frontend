@echo off
echo ==== Build frontend ====
cd C:\Users\luiza\ebay-anunturi-jean\ebay-anunturi-frontend
npm run build

echo ==== Copiere build în backend ====
xcopy /E /I /Y dist "C:\Users\luiza\ebay-anunturi-jean\build"

echo ==== Pornire server backend ====
cd ..
node server.js

pause
