@echo off
setlocal enabledelayedexpansion

echo 🚀 Iniciando ZeDudu CFEM Dashboard com Docker...
echo.
echo Verificando Docker...

docker --version >nul 2>&1
if errorlevel 1 (
    echo Docker nao encontrado! Instale de https://www.docker.com
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo Docker Compose nao encontrado!
    pause
    exit /b 1
)

echo ✓ Docker e Docker Compose encontrados
echo.
echo 🔨 Construindo e iniciando aplicacao...
echo.

call docker-compose up --build

echo.
echo ✓ Aplicacao iniciada!
echo.
echo Acessar:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo Para parar: Ctrl+C
echo.
pause
