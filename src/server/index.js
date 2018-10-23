/**
 * Initialization entry point
 * ESM module allows you to use standard import syntax in node :)
 * @type {[type]}
 */

// eslint-disable-next-line no-global-assign
require = require('esm')(module/* , options */);
require('dotenv').config();
const app = require('./server.js');
const { info } = require('./commons/logger');

// Close the http process / port when
process.on('SIGINT', (code) => {
  info(`beforeExit to exit with code: ${code}`);
  // TODO: export a close/stop method from index.js
  app.default.then(s => s.close());
});

module.exports = app;
