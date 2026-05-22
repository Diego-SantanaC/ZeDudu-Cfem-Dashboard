const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const logger = require('../backend/src/utils/logger');
const { CfemData, Municipio } = require('../backend/src/config/database');

const BASE_URL = 'https://sistemas.anm.gov.br/arrecadacao/extra/Relatorios/distribuicao_cfem_muni.aspx';
const MUNICIPIOS = ['Parauapebas', 'Marabá', 'Canaã dos Carajás', 'Curionópolis'];
const ANOS_INICIO = 2000;
const ANOS_FIM = 2026;

/**
 * Scrape CFEM data from ANM website
 * @param {number} ano - Year to scrape
 * @returns {Promise<Array>} Array of CFEM data
 */
async function scrapeCFEM(ano) {
  let browser;
  try {
    logger.info(`Starting scrape for year ${ano}`);
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(`${BASE_URL}?ano=${ano}&uf=PA`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const html = await page.content();
    const dados = parseHTML(html, ano);

    logger.info(`Scraped ${dados.length} records for year ${ano}`);
    return dados;
  } catch (error) {
    logger.error(`Error scraping year ${ano}:`, error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Parse HTML and extract CFEM data
 * @param {string} html - HTML content
 * @param {number} ano - Year
 * @returns {Array} Parsed CFEM data
 */
function parseHTML(html, ano) {
  const $ = cheerio.load(html);
  const dados = [];

  // Look for table rows (adjust selectors based on actual HTML structure)
  $('table tbody tr').each((index, element) => {
    try {
      const cells = $(element).find('td');
      if (cells.length < 13) return; // Should have at least 13 columns

      const municipio = $(cells[0]).text().trim();
      const isTargetCity = MUNICIPIOS.some(city => municipio.includes(city));

      if (!isTargetCity) return;

      // Extract monthly data (typically columns 1-12 contain monthly values)
      for (let mes = 1; mes <= 12; mes++) {
        const valor = parseFloat(
          $(cells[mes]).text().trim().replace(/[^\d,.-]/g, '').replace(',', '.')
        );

        if (!isNaN(valor) && valor > 0) {
          dados.push({
            municipio_nome: municipio,
            ano: ano,
            mes: mes,
            valor_cfem: valor,
            fonte: 'ANM',
            moeda: 'BRL'
          });
        }
      }
    } catch (error) {
      logger.debug(`Error parsing row ${index}:`, error.message);
    }
  });

  return dados;
}

/**
 * Save CFEM data to database
 * @param {Array} dados - CFEM data
 */
async function saveToDB(dados) {
  try {
    // Ensure municipalities exist
    for (const municipio of MUNICIPIOS) {
      await Municipio.findOrCreate({
        where: { nome: municipio },
        defaults: { uf: 'PA', ativo: true }
      });
    }

    // Save CFEM data
    for (const item of dados) {
      const municipioRecord = await Municipio.findOne({
        where: { nome: item.municipio_nome }
      });

      if (municipioRecord) {
        await CfemData.findOrCreate({
          where: {
            municipio_id: municipioRecord.id,
            ano: item.ano,
            mes: item.mes
          },
          defaults: {
            municipio_nome: item.municipio_nome,
            valor_cfem: item.valor_cfem,
            fonte: item.fonte,
            moeda: item.moeda
          }
        });
      }
    }

    logger.info(`Saved ${dados.length} records to database`);
  } catch (error) {
    logger.error('Error saving to database:', error.message);
  }
}

/**
 * Main scraper function
 */
async function main() {
  try {
    logger.info(`Starting CFEM data scraping for years ${ANOS_INICIO}-${ANOS_FIM}`);

    for (let ano = ANOS_INICIO; ano <= ANOS_FIM; ano++) {
      const dados = await scrapeCFEM(ano);
      if (dados.length > 0) {
        await saveToDB(dados);
      }
      // Add delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    logger.info('CFEM data scraping completed');
  } catch (error) {
    logger.error('Scraper error:', error.message);
  }
}

// Export for use in other files
module.exports = { scrapeCFEM, parseHTML, saveToDB, main };

// Run if called directly
if (require.main === module) {
  require('dotenv').config();
  const db = require('../backend/src/config/database');
  
  db.sequelize.authenticate()
    .then(() => {
      logger.info('Database connected');
      return db.sequelize.sync();
    })
    .then(() => main())
    .catch(error => {
      logger.error('Fatal error:', error);
      process.exit(1);
    });
}
