#!/bin/bash

echo "🚀 Iniciando ZeDudu CFEM Dashboard..."
echo ""
echo "Escolha como deseja iniciar:"
echo "1 - Com Docker (Recomendado)"
echo "2 - Instalação Manual"
echo ""
read -p "Digite sua escolha (1 ou 2): " choice

case $choice in
    1)
        echo "Iniciando com Docker..."
        bash start-docker.sh
        ;;
    2)
        echo "Iniciando instalação manual..."
        echo ""
        echo "⚠️  Certifique-se que PostgreSQL está instalado e rodando!"
        echo ""
        read -p "PostgreSQL está instalado? (s/n): " postgres_check
        
        if [ "$postgres_check" != "s" ]; then
            echo "Instale PostgreSQL de https://www.postgresql.org/download"
            exit 1
        fi
        
        bash setup.sh
        ;;
    *)
        echo "Opção inválida!"
        exit 1
        ;;
esac
