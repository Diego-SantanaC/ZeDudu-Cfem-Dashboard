# 🚀 COMECE AQUI - Guia Super Simples

## ⚡ 3 Passos para Usar o Dashboard

---

## OPÇÃO A: COM DOCKER (Mais Fácil - Recomendado)

### Passo 1: Instalar Docker
1. Acesse: https://www.docker.com/products/docker-desktop
2. Faça download para seu sistema operacional
3. Instale normalmente
4. Abra o Docker Desktop

### Passo 2: Clonar Repositório
```bash
git clone https://github.com/Diego-SantanaC/ZeDudu-Cfem-Dashboard.git
cd ZeDudu-Cfem-Dashboard
```

### Passo 3: Iniciar
**Windows:** Dê dois cliques em `start-docker.bat`
**Mac/Linux:** Execute: `bash start-docker.sh`

### Pronto! 🎉
Aguarde alguns minutos. Quando ver "listening on port 3000", abra:
👉 **http://localhost:3000**

---

## OPÇÃO B: SEM DOCKER (Manual)

### Passo 1: Instalar Programas

**A. Node.js**
- Acesse: https://nodejs.org
- Baixe versão LTS
- Instale normalmente

**B. PostgreSQL**
- Acesse: https://www.postgresql.org/download
- Baixe para seu sistema
- Instale

**C. Git**
- Acesse: https://git-scm.com
- Instale

### Passo 2: Clonar e Instalar
```bash
git clone https://github.com/Diego-SantanaC/ZeDudu-Cfem-Dashboard.git
cd ZeDudu-Cfem-Dashboard
```

**Windows:** Dê dois cliques em `run.bat` e escolha opção 2
**Mac/Linux:** Execute: `bash run.sh` e escolha opção 2

### Pronto! 🎉
Abra: 👉 **http://localhost:3000**

---

## 📊 Usando o Dashboard

### Homepage (Dashboard)
- Resumo de dados de CFEM
- Gráficos de arrecadação
- Top 3 cidades

### Clique em "Comparação"
- Por ano (2000-2026)
- Por mês (sazonalidade)
- Entre cidades

### Clique em "Análises"
- Tendências de crescimento
- Estatísticas
- Gráficos

### Clique em "Relatórios"
- Exportar CSV (Excel)
- Exportar PDF
- Imprimir

---

## 🐕 Coletar Dados do Site ANM

**Windows:** Dê dois cliques em `collect-data.bat`
**Mac/Linux:** Execute: `bash collect-data.sh`

Isso coleta dados de 2000 até 2026.

---

## 🔴 Problemas?

| Problema | Solução |
|----------|---------|
| Docker não inicia | Abra Docker Desktop e aguarde |
| Porta 3000 ocupada | Feche outros programas |
| Sem banco de dados | Certifique PostgreSQL está rodando |
| Sem dados | Execute collect-data |

---

**Boa análise! 🚀📊**
