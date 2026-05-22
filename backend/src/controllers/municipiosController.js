const { Municipio, CfemData } = require('../config/database');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

// Get all municipalities
exports.getAll = async (req, res, next) => {
  try {
    const municipios = await Municipio.findAll({
      where: { ativo: true },
      order: [['nome', 'ASC']]
    });

    res.json(municipios);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get municipality by id
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const municipio = await Municipio.findByPk(id);

    if (!municipio) {
      return res.status(404).json({ error: 'Municipality not found' });
    }

    res.json(municipio);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Create municipality
exports.create = async (req, res, next) => {
  try {
    const { nome, codigo_ibge, regiao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const municipio = await Municipio.create({
      nome,
      codigo_ibge,
      regiao,
      uf: 'PA'
    });

    res.status(201).json(municipio);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Update municipality
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const municipio = await Municipio.findByPk(id);

    if (!municipio) {
      return res.status(404).json({ error: 'Municipality not found' });
    }

    await municipio.update(req.body);
    res.json(municipio);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get municipality statistics
exports.getEstatisticas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const municipio = await Municipio.findByPk(id);

    if (!municipio) {
      return res.status(404).json({ error: 'Municipality not found' });
    }

    const dados = await CfemData.findAll({
      where: { municipio_id: id },
      raw: true
    });

    const stats = {
      municipio: municipio.nome,
      total_dados: dados.length,
      valor_total: dados.reduce((sum, d) => sum + parseFloat(d.valor_cfem), 0),
      valor_medio: dados.reduce((sum, d) => sum + parseFloat(d.valor_cfem), 0) / dados.length,
      valor_maximo: Math.max(...dados.map(d => parseFloat(d.valor_cfem))),
      valor_minimo: Math.min(...dados.map(d => parseFloat(d.valor_cfem))),
      anos_cobertos: [...new Set(dados.map(d => d.ano))].sort((a, b) => a - b)
    };

    res.json(stats);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
