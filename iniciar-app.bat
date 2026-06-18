@echo off
echo Iniciando MecanicaVis...
echo Abre http://localhost:5173 en tu navegador
echo Cierra esta ventana para parar el servidor
cd /d "%~dp0"
npm run dev
pause
