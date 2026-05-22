# ZeDudu CFEM Dashboard

Dashboard completo de análise comparativa de dados de CFEM (Compensação Financeira pela Exploração de Recursos Minerais) para municípios do Pará.

## 📊 Visão Geral

Este projeto coleta, processa e visualiza dados de CFEM dos municípios de:
- **Parauapebas**
- **Marabá**
- **Canaã dos Carajás**
- **Curionópolis**

**Período**: 2000-2026

**Fonte**: https://sistemas.anm.gov.br/arrecadacao/extra/Relatorios/distribuicao_cfem_muni.aspx

## 🏗️ Arquitetura

```
ZeDudu-Cfem-Dashboard/
├── backend/                 # API Node.js/Express
├── frontend/                # React Dashboard
├── data/                    # Scripts de coleta de dados
├── database/                # Schemas e migrations
└── docs/                    # Documentação
```

## 🚀 Funcionalidades

### Dashboard
- ✅ Comparação de CFEM por ano
- ✅ Comparação de CFEM por mês
- ✅ Comparação entre cidades
- ✅ Análise de tendências
- ✅ Relatórios detalhados
- ✅ Exportação de dados (CSV, PDF)
- ✅ Filtros avançados
- ✅ Gráficos interativos

### Coleta de Dados
- ✅ Web scraper automático
- ✅ Tratamento de erros
- ✅ Cache de dados
- ✅ Validação de dados

### Backend
- ✅ API RESTful
- ✅ Autenticação
- ✅ Relatórios agregados
- ✅ Histórico de dados

## 🛠️ Stack Tecnológico

### Frontend
- React 18
- TypeScript
- Recharts (gráficos)
- Tailwind CSS
- Axios

### Backend
- Node.js + Express
- PostgreSQL
- Sequelize ORM
- Winston (logging)

### Web Scraping
- Puppeteer / Cheerio
- Node Schedule (jobs agendados)

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

## 🚀 Início Rápido

```bash
# Clone o repositório
git clone https://github.com/Diego-SantanaC/ZeDudu-Cfem-Dashboard.git
cd ZeDudu-Cfem-Dashboard

# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm start
```

## 📊 Análise de Dados

O dashboard oferece análises detalhadas incluindo:

1. **Comparação Anual**: Evolução de CFEM ao longo dos anos (2000-2026)
2. **Comparação Mensal**: Sazonalidade e padrões por mês
3. **Comparação por Cidade**: Performance relativa entre municípios
4. **Tendências**: Crescimento, declínio, anomalias
5. **Rankings**: Qual cidade foi mais arrecadadora em cada período
6. **Relatórios**: Exportação de dados e gráficos

## 📝 Endpoints da API

```
GET  /api/cfem/municipios           - Lista de municípios
GET  /api/cfem/dados                - Dados brutos
GET  /api/cfem/comparacao/anual     - Comparação anual
GET  /api/cfem/comparacao/mensal    - Comparação mensal
GET  /api/cfem/comparacao/cidade    - Comparação entre cidades
GET  /api/cfem/relatorio/pdf        - Gerar PDF
GET  /api/cfem/relatorio/csv        - Exportar CSV
```

## 📈 Estrutura de Dados

```json
{
  "id": "UUID",
  "municipio": "string",
  "ano": "number",
  "mes": "number",
  "valor_cfem": "decimal",
  "data_coleta": "timestamp",
  "fonte": "string"
}
```

## 🤝 Contribuindo

Para contribuir com melhorias, faça um fork e envie um pull request.

## 📄 Licença

MIT

## 👤 Autor

Diego Santana Chavier (@Diego-SantanaC)

---

**Última atualização**: 2026-05-22
