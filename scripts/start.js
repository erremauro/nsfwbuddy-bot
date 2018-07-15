#! /usr/bin/env node
const nodemon = require('nodemon');
const paths = require('../config/paths');
const logger = require('rear-logger')('start-script');

const proc = nodemon({
  script: paths.appBinScript,
  args: process.argv.slice(2),
  debug: process.env.NODE_ENV !== 'production' ? true : false,
});

nodemon.on('start', () => {
  // The bin script clear the console so we must delay our message.
  setTimeout(() => {
    logger.hint(`Type %crs%c to restart`, 'yellow');
  }, 500);
});

nodemon.on('restart', () => {
  // The bin script clear the console so we must delay our message.
  setTimeout(() => {
    logger.info('The server has been restarted');
  }, 500);
});

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
