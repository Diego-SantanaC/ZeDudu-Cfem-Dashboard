# Guia de Configuração - ZeDudu CFEM Dashboard

## Pré-requisitos

- Node.js 18.0.0 ou superior
- npm 8.0.0 ou superior
- PostgreSQL 12 ou superior
- Git

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Diego-SantanaC/ZeDudu-Cfem-Dashboard.git
cd ZeDudu-Cfem-Dashboard
```

### 2. Configurar Banco de Dados

#### No PostgreSQL:

```sql
CREATE DATABASE zedudu_cfem;
CREATE USER zedudu_user WITH PASSWORD 'sua_senha_aqui';
ALTER ROLE zedudu_user SET client_encoding TO 'utf8';
ALTER ROLE zedudu_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE zedudu_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE zedudu_cfem TO zedudu_user;
```

#### Executar migrations:

```bash
psql -U zedudu_user -d zedudu_cfem -f database/migrations/001-initial-schema.sql
```

### 3. Configurar Backend

```bash
cd backend
npm install
```

Crie arquivo `.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=zedudu_cfem
DB_USER=zedudu_user
DB_PASSWORD=sua_senha_aqui

JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRE=7d

SCRAPER_ENABLED=true
SCRAPER_CRON=0 2 * * *
SCRAPER_BASE_URL=https://sistemas.anm.gov.br/arrecadacao/extra/Relatorios/distribuicao_cfem_muni.aspx

MUNICIPIOS=Parauapebas,Marabá,Canaã dos Carajás,Curionópolis
ANOS_INICIO=2000
ANOS_FIM=2026

CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

Inicie o backend:

```bash
npm run dev
```

### 4. Configurar Frontend

Em novo terminal:

```bash
cd frontend
npm install
```

Crie arquivo `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Inicie o frontend:

```bash
npm start
```

## Acesso à Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/health

## Coletar Dados (Web Scraper)

Para iniciar a coleta manual de dados:

```bash
cd backend
node ../data/scraper.js
```

Ou agendar coleta automática:

```bash
node ../data/scheduler.js
```

## Endpoints da API

### CFEM
- `GET /api/cfem/dados` - Todos os dados
- `GET /api/cfem/municipio/:municipio` - Por município
- `GET /api/cfem/ano/:ano` - Por ano
- `GET /api/cfem/comparacao/anual` - Comparação anual
- `GET /api/cfem/comparacao/mensal` - Comparação mensal
- `GET /api/cfem/comparacao/cidade` - Comparação por cidade
- `GET /api/cfem/analise/tendencias` - Análise de tendências
- `GET /api/cfem/rankings/ano/:ano` - Rankings por ano

### Relatórios
- `GET /api/relatorios/export/csv` - Exportar CSV
- `GET /api/relatorios/export/pdf` - Exportar PDF
- `GET /api/relatorios/comparacao` - Relatório de comparação
- `GET /api/relatorios/anual/:ano` - Relatório anual
- `GET /api/relatorios/resumo` - Resumo geral

### Municípios
- `GET /api/municipios` - Listar todos
- `GET /api/municipios/:id` - Por ID
- `POST /api/municipios` - Criar
- `PUT /api/municipios/:id` - Atualizar
- `GET /api/municipios/:id/estatisticas` - Estatísticas

## Troubleshooting

### Erro de conexão com banco de dados

1. Verifique se PostgreSQL está rodando
2. Confirme as credenciais em `.env`
3. Verifique se o banco de dados foi criado

### Scraper não funciona

1. Verifique internet
2. Confirme URL do site ANM
3. Verifique logs em `error.log`

### Problemas com CORS

1. Verifique `CORS_ORIGIN` no `.env`
2. Certifique-se que frontend está na URL correta

## Estrutura de Dados

### Municipios
```json
{
  "id": "uuid",
  "nome": "string",
  "uf": "PA",
  "codigo_ibge": "string",
  "regiao": "string",
  "ativo": true
}
```

### CFEM Data
```json
{
  "id": "uuid",
  "municipio_id": "uuid",
  "municipio_nome": "string",
  "ano": 2025,
  "mes": 12,
  "valor_cfem": 1234567.89,
  "moeda": "BRL",
  "fonte": "ANM",
  "data_coleta": "timestamp"
}
```

## Desenvolvimento

### Scripts disponíveis

**Backend:**
- `npm run dev` - Inicia em modo desenvolvimento
- `npm start` - Inicia modo produção
- `npm test` - Executa testes

**Frontend:**
- `npm start` - Inicia em modo desenvolvimento
- `npm build` - Build de produção
- `npm test` - Executa testes

## Deploy

Veja [DEPLOY.md](DEPLOY.md) para instruções de deploy em produção.

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
