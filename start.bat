@echo off
setlocal enabledelayedexpansion

echo 🚀 Iniciando ZeDudu CFEM Dashboard...
echo.
echo Escolha como deseja iniciar:
echo 1 - Com Docker (Recomendado)
echo 2 - Instalacao Manual
echo.
set /p choice="Digite sua escolha (1 ou 2): "

if "%choice%"=="1" (
    echo Iniciando com Docker...
    call start-docker.bat
) else if "%choice%"=="2" (
    echo Iniciando instalacao manual...
    echo.
    echo ⚠️  Certifique-se que PostgreSQL esta instalado e rodando!
    echo.
    set /p postgres_check="PostgreSQL esta instalado? (s/n): "
    
    if "%postgres_check%" neq "s" (
        echo Instale PostgreSQL de https://www.postgresql.org/download
        pause
        exit /b 1
    )
    
    call setup.bat
) else (
    echo Opcao invalida!
    exit /b 1
)
