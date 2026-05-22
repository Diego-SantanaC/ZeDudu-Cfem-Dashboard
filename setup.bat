@echo off
setlocal enabledelayedexpansion

echo 🚀 Iniciando configuracao do ZeDudu CFEM Dashboard...

REM Verificar Node.js
echo [1/3] Verificando Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js nao encontrado! Instale de https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

REM Verificar npm
echo [2/3] Verificando npm...
npm -v >nul 2>&1
if errorlevel 1 (
    echo ✗ npm nao encontrado!
    pause
    exit /b 1
)
echo ✓ npm encontrado

REM Backend
echo [3/3] Instalando dependencias do Backend...
cd backend
call npm install
if errorlevel 1 (
    echo ✗ Erro ao instalar Backend
    pause
    exit /b 1
)
echo ✓ Backend instalado
cd ..

REM Frontend
echo Instalando dependencias do Frontend...
cd frontend
call npm install
if errorlevel 1 (
    echo ✗ Erro ao instalar Frontend
    pause
    exit /b 1
)
echo ✓ Frontend instalado
cd ..

echo.
echo ✓ Configuracao concluida!
echo.
echo Proximos passos:
echo 1. Abra dois terminais (Prompt de Comando ou PowerShell)
echo 2. Terminal 1: cd backend ^&^& npm run dev
echo 3. Terminal 2: cd frontend ^&^& npm start
echo.
echo 🎉 Dashboard sera aberto em http://localhost:3000
echo.
pause
