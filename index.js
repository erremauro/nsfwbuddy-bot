const env = require('./config/env');
const createStore = require('./core/create-store');
const { setStore } = require('./core/store');
const intl = require('./core/intl');
const { it, en } = require('./l10n');
const createNsfwBuddyBot = require('./containers/NsfwBuddyBot');
const config = require('./config');

function start() {
  setStore(createStore());
  intl.addMessages('it', it);
  intl.addMessages('en', en);

  const bot = createNsfwBuddyBot({config});

  bot.configureBot();
  bot.start();
}

module.exports = { start }
