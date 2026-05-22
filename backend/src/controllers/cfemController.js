const { CfemData, Municipio } = require('../config/database');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

// Get all CFEM data
exports.getDados = async (req, res, next) => {
  try {
    const { municipio, ano, mes, limit = 1000, offset = 0 } = req.query;
    const where = {};

    if (municipio) where.municipio_nome = municipio;
    if (ano) where.ano = parseInt(ano);
    if (mes) where.mes = parseInt(mes);

    const dados = await CfemData.findAndCountAll({
      where,
      order: [['ano', 'DESC'], ['mes', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: dados.count,
      data: dados.rows
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get CFEM by municipality
exports.getDadosByMunicipio = async (req, res, next) => {
  try {
    const { municipio } = req.params;
    const dados = await CfemData.findAll({
      where: { municipio_nome: municipio },
      order: [['ano', 'DESC'], ['mes', 'DESC']]
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get CFEM by year
exports.getDadosByAno = async (req, res, next) => {
  try {
    const { ano } = req.params;
    const dados = await CfemData.findAll({
      where: { ano: parseInt(ano) },
      order: [['mes', 'ASC']]
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Get CFEM by year and month
exports.getDadosByMeE = async (req, res, next) => {
  try {
    const { ano, mes } = req.params;
    const dados = await CfemData.findAll({
      where: {
        ano: parseInt(ano),
        mes: parseInt(mes)
      }
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Annual comparison
exports.comparacaoAnual = async (req, res, next) => {
  try {
    const { municipio } = req.query;
    const where = municipio ? { municipio_nome: municipio } : {};

    const dados = await CfemData.findAll({
      where,
      attributes: [
        'ano',
        'municipio_nome',
        [require('sequelize').fn('sum', require('sequelize').col('valor_cfem')), 'total_anual']
      ],
      group: ['ano', 'municipio_nome'],
      order: [['ano', 'DESC']],
      raw: true
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Monthly comparison
exports.comparacaoMensal = async (req, res, next) => {
  try {
    const { ano } = req.query;
    const where = ano ? { ano: parseInt(ano) } : {};

    const dados = await CfemData.findAll({
      where,
      attributes: [
        'mes',
        'municipio_nome',
        [require('sequelize').fn('sum', require('sequelize').col('valor_cfem')), 'total_mensal']
      ],
      group: ['mes', 'municipio_nome'],
      order: [['mes', 'ASC']],
      raw: true
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// City comparison
exports.comparacaoCidade = async (req, res, next) => {
  try {
    const { ano } = req.query;
    const where = ano ? { ano: parseInt(ano) } : {};

    const dados = await CfemData.findAll({
      where,
      attributes: [
        'municipio_nome',
        [require('sequelize').fn('sum', require('sequelize').col('valor_cfem')), 'total_cidade'],
        [require('sequelize').fn('avg', require('sequelize').col('valor_cfem')), 'media_cidade']
      ],
      group: ['municipio_nome'],
      order: [[require('sequelize').fn('sum', require('sequelize').col('valor_cfem')), 'DESC']],
      raw: true
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Trends analysis
exports.analiseTendencias = async (req, res, next) => {
  try {
    const { municipio } = req.query;
    const where = municipio ? { municipio_nome: municipio } : {};

    const dados = await CfemData.findAll({
      where,
      attributes: ['ano', 'municipio_nome', 'valor_cfem'],
      order: [['ano', 'ASC'], ['mes', 'ASC']],
      raw: true
    });

    res.json(dados);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Rankings per year
exports.rankingsPorAno = async (req, res, next) => {
  try {
    const { ano } = req.params;

    const dados = await CfemData.findAll({
      where: { ano: parseInt(ano) },
      attributes: [
        'municipio_nome',
        [require('sequelize').fn('sum', require('sequelize').col('valor_cfem')), 'total_anual']
      ],
      group: ['municipio_nome'],
      order: [[require('sequelize').fn('sum', require('sequelize').col('valor_cfem')), 'DESC']],
      raw: true
    });

    const ranking = dados.map((item, index) => ({
      posicao: index + 1,
      ...item
    }));

    res.json(ranking);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
