const express = require('express');
const router = express.Router();
const municipiosController = require('../controllers/municipiosController');

// Get all municipalities
router.get('/', municipiosController.getAll);

// Get municipality by id
router.get('/:id', municipiosController.getById);

// Create municipality
router.post('/', municipiosController.create);

// Update municipality
router.put('/:id', municipiosController.update);

// Get municipality statistics
router.get('/:id/estatisticas', municipiosController.getEstatisticas);

module.exports = router;
