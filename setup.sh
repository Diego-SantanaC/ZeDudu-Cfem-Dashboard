#!/bin/bash

echo "🚀 Iniciando configuração do ZeDudu CFEM Dashboard..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "${BLUE}Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js não encontrado! Instale de https://nodejs.org${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) encontrado${NC}"

# Verificar npm
echo -e "${BLUE}Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm não encontrado!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v) encontrado${NC}"

# Backend
echo -e "${BLUE}\n📦 Instalando dependências do Backend...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend instalado${NC}"
else
    echo -e "${RED}✗ Erro ao instalar Backend${NC}"
    exit 1
fi
cd ..

# Frontend
echo -e "${BLUE}\n📦 Instalando dependências do Frontend...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend instalado${NC}"
else
    echo -e "${RED}✗ Erro ao instalar Frontend${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}\n✓ Configuração concluída!${NC}"
echo -e "${BLUE}\nPróximos passos:${NC}"
echo -e "${BLUE}1. Abra dois terminais${NC}"
echo -e "${BLUE}2. Terminal 1: cd backend && npm run dev${NC}"
echo -e "${BLUE}3. Terminal 2: cd frontend && npm start${NC}"
echo -e "${BLUE}\n🎉 Dashboard será aberto em http://localhost:3000${NC}"
