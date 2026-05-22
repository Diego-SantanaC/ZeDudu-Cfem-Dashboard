# 🚀 Quick Start - ZeDudu CFEM Dashboard

## ⚡ Opção 1: Usar Docker (RECOMENDADO - Mais Fácil)

### Pré-requisitos
- Docker Desktop instalado
- (Windows: WSL2 configurado)
- (Mac: M1/M2 pode ter limitações)

### Iniciar em 3 passos:

```bash
# 1. Clone o repositório
git clone https://github.com/Diego-SantanaC/ZeDudu-Cfem-Dashboard.git
cd ZeDudu-Cfem-Dashboard

# 2. Inicie com Docker Compose
docker-compose up --build

# 3. Abra no navegador
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# API: http://localhost:5000/health
```

**Pronto!** Está rodando automaticamente. 🎉

### Parar a aplicação:
```bash
docker-compose down
```

---

## 📦 Opção 2: Instalação Manual (Windows/Mac/Linux)

### Pré-requisitos
- Node.js 18+ (download em https://nodejs.org)
- PostgreSQL 12+ (download em https://www.postgresql.org/download)
- Git instalado

### Passo 1: Criar Banco de Dados PostgreSQL

**Windows:**
1. Abra pgAdmin (vem com PostgreSQL)
2. Crie novo servidor/banco
3. Nome: `zedudu_cfem`
4. Usuário: `postgres`
5. Senha: `postgres`

**Mac/Linux:**
```bash
sudo -u postgres createdb zedudu_cfem
```

### Passo 2: Clonar Repositório

```bash
git clone https://github.com/Diego-SantanaC/ZeDudu-Cfem-Dashboard.git
cd ZeDudu-Cfem-Dashboard
```

### Passo 3: Instalar e Iniciar Backend

```bash
cd backend
npm install
npm run dev
```

**Deixe rodando neste terminal!**

### Passo 4: Instalar e Iniciar Frontend (NOVO TERMINAL)

```bash
cd frontend
npm install
npm start
```

**Seu navegador abrirá automaticamente em http://localhost:3000**

---

## ✅ Verificar se está funcionando

### Frontend
- ✅ Acesse: http://localhost:3000
- Você deve ver: **ZeDudu CFEM Dashboard** com menu de navegação

### Backend
- ✅ Acesse: http://localhost:5000/health
- Você deve ver: `{"status":"OK","timestamp":"..."}`

### API
- ✅ Acesse: http://localhost:5000/api/municipios
- Você deve ver: Lista de cidades em JSON

---

## 🔄 Coletar Dados do Site ANM

### Opção 1: Automático (Recomendado)
Os dados são coletados automaticamente a cada dia às 2 AM.

### Opção 2: Manual

**Com Docker:**
```bash
docker-compose exec backend node ../data/scraper.js
```

**Sem Docker:**
```bash
node data/scraper.js
```

**Aguarde a conclusão.** Isso pode levar alguns minutos.

---

## 📊 Usando o Dashboard

### Dashboard Principal
1. Abra http://localhost:3000
2. Veja resumo geral de CFEM
3. Visualize gráficos de arrecadação
4. Veja Top 3 cidades

### Comparações
1. Clique em "Comparação"
2. Escolha tipo:
   - **Anual**: Evolução por ano
   - **Mensal**: Padrão por mês
   - **Cidade**: Comparar cidades
3. Veja o gráfico interativo

### Análises
1. Clique em "Análises"
2. Selecione um município
3. Veja tendência de arrecadação
4. Visualize estatísticas

### Relatórios
1. Clique em "Relatórios"
2. Aplique filtros (opcional)
3. Exporte como:
   - **CSV**: Para Excel/Google Sheets
   - **PDF**: Documento formatado
   - **Print**: Imprimir

---

## 🆘 Problemas Comuns

### "Banco de dados não encontrado"

**Solução:**
1. Abra pgAdmin ou terminal PostgreSQL
2. Crie banco: `CREATE DATABASE zedudu_cfem;`
3. Reinicie o backend: `npm run dev`

### "Porta 5000 já está em uso"

**Solução:**
```bash
# Mudar porta no backend/.env
PORT=5001
```

### "Porta 3000 já está em uso"

**Solução:**
```bash
# Mudar porta manualmente ao iniciar
PORT=3001 npm start
```

### "API não responde"

**Solução:**
1. Verifique se backend está rodando
2. Verifique firewall/antivírus
3. Reinicie terminal e tente novamente

### "Nenhum dado aparece no dashboard"

**Solução:**
1. Execute scraper manualmente
2. Aguarde conclusão
3. Atualize página (F5)

---

## 🐳 Comandos Docker Úteis

```bash
# Parar aplicação
docker-compose down

# Ver logs
docker-compose logs -f

# Logs específicos
docker-compose logs -f backend
docker-compose logs -f frontend

# Reiniciar
docker-compose restart

# Reconstruir
docker-compose build --no-cache

# Remover tudo
docker-compose down -v
```

---

## 📱 Acessar de Outro Computador na Rede

```bash
# Descubra seu IP
# Windows: ipconfig
# Mac/Linux: ifconfig

# Então acesse
http://seu-ip:3000
```

---

## 🚀 Próximos Passos

1. ✅ Dashboard funcionando?
2. ⏳ Aguarde scraper coletar dados (primeiras 24h)
3. 📊 Comece a explorar dados
4. 📈 Use as análises para insights
5. 📥 Exporte relatórios em CSV/PDF

---

## 📞 Precisa de Ajuda?

- Abra uma issue no GitHub
- Leia docs/SETUP.md para detalhes técnicos
- Leia docs/ANALISE_DETALHADA.md para análises

**Boa análise! 🎉**
