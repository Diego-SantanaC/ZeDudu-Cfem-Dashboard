require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger');
const db = require('./config/database');

// Routes
const cfemRoutes = require('./routes/cfem');
const municipiosRoutes = require('./routes/municipios');
const relatorioRoutes = require('./routes/relatorios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/cfem', cfemRoutes);
app.use('/api/municipios', municipiosRoutes);
app.use('/api/relatorios', relatorioRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

// Database connection and server start
db.sequelize.authenticate()
  .then(() => {
    logger.info('Database connected successfully');
    return db.sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Database connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
