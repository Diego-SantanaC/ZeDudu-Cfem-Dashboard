const { CfemData } = require('../config/database');
const logger = require('../utils/logger');
const PDFDocument = require('pdfkit');
const Papa = require('papaparse');

// Export as CSV
exports.exportarCSV = async (req, res, next) => {
  try {
    const { municipio, ano } = req.query;
    const where = {};

    if (municipio) where.municipio_nome = municipio;
    if (ano) where.ano = parseInt(ano);

    const dados = await CfemData.findAll({
      where,
      order: [['ano', 'DESC'], ['mes', 'DESC']],
      raw: true
    });

    const csv = Papa.unparse(dados);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="cfem_dados.csv"');
    res.send(csv);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Export as PDF
exports.exportarPDF = async (req, res, next) => {
  try {
    const { municipio, ano } = req.query;
    const where = {};

    if (municipio) where.municipio_nome = municipio;
    if (ano) where.ano = parseInt(ano);

    const dados = await CfemData.findAll({
      where,
      order: [['ano', 'DESC'], ['mes', 'DESC']],
      raw: true
    });

    const doc = new PDFDocument();
    const filename = 'cfem_relatorio.pdf';

    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    doc.fontSize(20).text('Relatório CFEM', 100, 100);
    doc.fontSize(12).text(`Municipio: ${municipio || 'Todos'}`, 100, 130);
    doc.fontSize(12).text(`Ano: ${ano || 'Todos'}`, 100, 150);

    doc.fontSize(10);
    let y = 180;
    dados.slice(0, 50).forEach(item => {
      doc.text(`${item.municipio_nome} - ${item.ano}/${String(item.mes).padStart(2, '0')}: R$ ${parseFloat(item.valor_cfem).toLocaleString('pt-BR')}`, 100, y);
      y += 15;
    });

    doc.end();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Generate comparison report
exports.relatorioComparacao = async (req, res, next) => {
  try {
    const dados = await CfemData.findAll();

    const relatorio = {
      data_geracao: new Date().toISOString(),
      municipios: [...new Set(dados.map(d => d.municipio_nome))],
      anos_cobertos: [...new Set(dados.map(d => d.ano))].sort((a, b) => a - b),
      total_registros: dados.length,
      valor_total_arrecadado: dados.reduce((sum, d) => sum + parseFloat(d.valor_cfem), 0)
    };

    res.json(relatorio);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Generate annual report
exports.relatorioAnual = async (req, res, next) => {
  try {
    const { ano } = req.params;
    const dados = await CfemData.findAll({
      where: { ano: parseInt(ano) }
    });

    const relatorio = {
      ano: parseInt(ano),
      total_arrecadado: dados.reduce((sum, d) => sum + parseFloat(d.valor_cfem), 0),
      por_municipio: {},
      por_mes: {}
    };

    dados.forEach(item => {
      if (!relatorio.por_municipio[item.municipio_nome]) {
        relatorio.por_municipio[item.municipio_nome] = 0;
      }
      relatorio.por_municipio[item.municipio_nome] += parseFloat(item.valor_cfem);

      if (!relatorio.por_mes[item.mes]) {
        relatorio.por_mes[item.mes] = 0;
      }
      relatorio.por_mes[item.mes] += parseFloat(item.valor_cfem);
    });

    res.json(relatorio);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

// Generate summary
exports.resumo = async (req, res, next) => {
  try {
    const dados = await CfemData.findAll();

    const resumo = {
      periodo: {
        inicio: Math.min(...dados.map(d => d.ano)),
        fim: Math.max(...dados.map(d => d.ano))
      },
      municipios_total: [...new Set(dados.map(d => d.municipio_nome))].length,
      municipios: [...new Set(dados.map(d => d.municipio_nome))],
      total_arrecadado: dados.reduce((sum, d) => sum + parseFloat(d.valor_cfem), 0),
      media_mensal: dados.reduce((sum, d) => sum + parseFloat(d.valor_cfem), 0) / dados.length,
      top_3_municipios: await getTop3Municipios(dados)
    };

    res.json(resumo);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

async function getTop3Municipios(dados) {
  const totais = {};
  dados.forEach(item => {
    if (!totais[item.municipio_nome]) totais[item.municipio_nome] = 0;
    totais[item.municipio_nome] += parseFloat(item.valor_cfem);
  });

  return Object.entries(totais)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([municipio, total], index) => ({
      posicao: index + 1,
      municipio,
      total
    }));
}
