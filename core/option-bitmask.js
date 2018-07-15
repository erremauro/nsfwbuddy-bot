const AdvancedOptionFlags = {
  badLanguage: 1,
  nudity: 2,
  violence: 4,
  discrimination: 8,
  drugs: 16,
  gore: 32,
  porn: 64,
  requireAge: 128
};

const AdvancedOptionLables = {
  1: 'Bad Language',
  2: 'Nudity',
  4: 'Violence',
  8: 'Discrimination',
  16: 'Drugs',
  32: 'Gore',
  64: 'Porn',
  128: 'Require age confirmation'
}

function getRequiredAge(mask) {
  const flags = AdvancedOptionFlags;
  let bitmask = mask;
  if (containsMask(mask, AdvancedOptionFlags.requireAge)) {
    bitmask = toggleMask(bitmask, AdvancedOptionFlags.requireAge)
  }

  if (containsMask(bitmask, flags.gore) ||
      containsMask(bitmask, flags.porn)) {
    return '18';
  }

  if (containsMask(bitmask, flags.violence) ||
      containsMask(bitmask, flags.discrimination) ||
      containsMask(bitmask, flags.drugs)) {
    return '16';
  }

  return '14';
}

function containsMask(bitmask, mask) {
  return bitmask & mask;
}

function toggleMask(bitmask, mask) {
  return bitmask ^= mask;
}

function getMaskLabel(mask) {
  return AdvancedOptionLables[mask];
}

function getMasks() {
  return Object.keys(AdvancedOptionLables)
    .filter(mask => parseInt(mask, 10) !== AdvancedOptionFlags.requireAge)
}

function getFlags() {
  return Object.keys(AdvancedOptionFlags)
    .filter(flag => flag !== AdvancedOptionFlags.requireAge)
}

module.exports = {
  AdvancedOptionFlags,
  AdvancedOptionLables,
  getRequiredAge,
  containsMask,
  toggleMask,
  getMaskLabel,
  getMasks,
  getFlags
}
