@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================
echo  Subiendo el proyecto a GitHub...
echo.
echo  Si se abre una ventana del navegador, inicia sesion en
echo  GitHub y autoriza "Git Credential Manager". Solo hace
echo  falta la primera vez.
echo ============================================================
echo.
git push -u origin main
echo.
echo ============================================================
echo  Si arriba ves algo como:
echo     branch 'main' set up to track 'origin/main'
echo  entonces ha funcionado. Avisa a Claude.
echo ============================================================
echo.
pause
