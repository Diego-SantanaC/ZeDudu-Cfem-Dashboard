#!/bin/bash

echo "🚀 Iniciando ZeDudu CFEM Dashboard com Docker..."
echo ""
echo "Verificando Docker..."

if ! command -v docker &> /dev/null; then
    echo "Docker não encontrado! Instale de https://www.docker.com"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose não encontrado! Instale de https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker e Docker Compose encontrados"
echo ""
echo "🔨 Construindo e iniciando aplicação..."
echo ""

docker-compose up --build

echo ""
echo "✓ Aplicação iniciada!"
echo ""
echo "Acessar:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  Health:   http://localhost:5000/health"
echo ""
echo "Para parar: Ctrl+C ou execute: docker-compose down"
