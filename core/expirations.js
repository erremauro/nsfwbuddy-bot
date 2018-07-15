const ExpirationFlags = {
  oneDay: 1,
  oneWeek: 2,
  oneMonth: 4,
  oneYear: 8,
  never: 128,
}

const ExpirationLabels = {
  1: '1 day',
  2: '1 week',
  4: '1 month',
  8: '1 year',
  128: 'never'
}

const ExpirationValues = {
  1: 'oneDay',
  2: 'oneWeek',
  4: 'oneMonth',
  8: 'oneYear',
  128: 'never'
}

function getExpirationLabel(mask) {
  return ExpirationLabels[mask];
}

function getExpirationMasks() {
  return Object.keys(ExpirationLabels);
}

module.exports = {
  ExpirationFlags,
  ExpirationLabels,
  ExpirationValues,
  getExpirationLabel,
  getExpirationMasks
};
