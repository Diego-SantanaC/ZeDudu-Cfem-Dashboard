const schedule = require('node-schedule');
const logger = require('../backend/src/utils/logger');
const { main: runScraper } = require('./scraper');

/**
 * Schedule CFEM data scraping
 * Default: Every day at 2 AM
 */
function scheduleScraper() {
  const cronTime = process.env.SCRAPER_CRON || '0 2 * * *';

  const job = schedule.scheduleJob(cronTime, async () => {
    logger.info('Scheduled CFEM scraping job started');
    try {
      await runScraper();
      logger.info('Scheduled scraping job completed successfully');
    } catch (error) {
      logger.error('Scheduled scraping job failed:', error.message);
    }
  });

  logger.info(`CFEM scraper scheduled with cron: ${cronTime}`);
  return job;
}

// Export
module.exports = { scheduleScraper };

// Start scheduler if called directly
if (require.main === module) {
  require('dotenv').config();
  const db = require('../backend/src/config/database');

  db.sequelize.authenticate()
    .then(() => {
      logger.info('Database connected');
      scheduleScraper();
      logger.info('Scheduler initialized');
    })
    .catch(error => {
      logger.error('Failed to initialize scheduler:', error);
      process.exit(1);
    });
}
