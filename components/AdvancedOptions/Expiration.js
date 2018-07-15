const Component = require('../../core/Component');
const { formatMessage } = require('../../core/intl');
const { ExpirationFlags, ExpirationValues } = require('../../core/expirations');

class Expiration extends Component {
  constructor(props) {
    super(props)
    this.configureBot();
  }

  configureBot() {
    this.props.bot.on('ask.expiration', this.handleExpiration.bind(this));
  }

  mount(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const message = formatMessage(user.locale, {
      id: 'bot.expiration',
      defaultMessage: 'How long would you like to make your link be available?'
    })
    const replyMarkup = {
      ask: 'expiration',
      replyMarkup: this.props.bot.keyboard([
        [formatMessage(user.locale, {
          id: 'bot.expiration.oneDay',
          defaultMessage: '1 Day'
        }),
        formatMessage(user.locale, {
          id: 'bot.expiration.oneWeek',
          defaultMessage: '1 Week'
        })],
        [formatMessage(user.locale, {
          id: 'bot.expiration.oneMonth',
          defaultMessage: '1 Month'
        }),
        formatMessage(user.locale, {
          id: 'bot.expiration.oneYear',
          defaultMessage: '1 Year'
        })],
        [formatMessage(user.locale, {
          id: 'bot.expiration.never',
          defaultMessage: 'Never'
        }),
        formatMessage(user.locale, {
          id: 'bot.cancel',
          defaultMessage: 'Cancel'
        })],
      ])
    }
    return this.props.bot.sendMessage(id, message, replyMarkup)
  }

  handleExpiration(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const selectedExpiration = this.getSelectedExpiration(user, msg.text);
    const shouldCancel = selectedExpiration === -1;

    if (shouldCancel) {
      const message = formatMessage(user.locale, {
        id: 'bot.expiration.cancelled',
        defaultMessage: 'Expiration date setup cancelled'
      })
      return this.props.bot.sendMessage(id, message, {replyMarkup: 'hide'})
        .then(() => this.props.onCancel(msg));
    }

    this.props.updateSession(id, { data: { expiration: selectedExpiration } });

    const message = formatMessage(user.locale, {
      id: 'bot.expiration.updated',
      defaultMessage: 'Expiration date set to'
    }) + " " + formatMessage(user.locale, {
      id: 'bot.expiration.' + ExpirationValues[selectedExpiration]
    })

    return this.props.bot.sendMessage(id, message, {replyMarkup: 'hide'})
      .then(() => this.props.onDone(msg));
  }

  getSelectedExpiration(user, expirationText) {
    const oneDay = formatMessage(user.locale, {
      id: 'bot.expiration.oneDay',
      defaultMessage: '1 Day'
    });
    const oneWeek = formatMessage(user.locale, {
      id: 'bot.expiration.oneWeek',
      defaultMessage: '1 Week'
    });
    const oneMonth = formatMessage(user.locale, {
      id: 'bot.expiration.oneMonth',
      defaultMessage: '1 Month'
    });
    const oneYear = formatMessage(user.locale, {
      id: 'bot.expiration.oneYear',
      defaultMessage: '1 Year'
    })
    const never = formatMessage(user.locale, {
      id: 'bot.expiration.never',
      defaultMessage: 'Never'
    });

    switch (expirationText) {
      case oneDay:
        return ExpirationFlags.oneDay;
      case oneWeek:
        return ExpirationFlags.oneWeek;
      case oneMonth:
        return ExpirationFlags.oneMonth;
      case oneYear:
        return ExpirationFlags.oneYear;
      case never:
        return ExpirationFlags.never;
      default:
        return -1;
    }
  }
}

module.exports = Expiration;
