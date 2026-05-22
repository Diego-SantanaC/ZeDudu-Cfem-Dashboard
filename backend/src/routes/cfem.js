const express = require('express');
const router = express.Router();
const cfemController = require('../controllers/cfemController');

// Get all CFEM data
router.get('/dados', cfemController.getDados);

// Get CFEM by municipality
router.get('/municipio/:municipio', cfemController.getDadosByMunicipio);

// Get CFEM by year
router.get('/ano/:ano', cfemController.getDadosByAno);

// Get CFEM by year and month
router.get('/ano/:ano/mes/:mes', cfemController.getDadosByMeE);

// Annual comparison
router.get('/comparacao/anual', cfemController.comparacaoAnual);

// Monthly comparison
router.get('/comparacao/mensal', cfemController.comparacaoMensal);

// City comparison
router.get('/comparacao/cidade', cfemController.comparacaoCidade);

// Trends analysis
router.get('/analise/tendencias', cfemController.analiseTendencias);

// Rankings
router.get('/rankings/ano/:ano', cfemController.rankingsPorAno);

module.exports = router;
