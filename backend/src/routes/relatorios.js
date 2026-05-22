const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Export as CSV
router.get('/export/csv', relatorioController.exportarCSV);

// Export as PDF
router.get('/export/pdf', relatorioController.exportarPDF);

// Generate comparison report
router.get('/comparacao', relatorioController.relatorioComparacao);

// Generate annual report
router.get('/anual/:ano', relatorioController.relatorioAnual);

// Generate summary
router.get('/resumo', relatorioController.resumo);

module.exports = router;
