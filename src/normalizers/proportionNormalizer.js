const _ = require('lodash');
const utils = require('../calculators/utils');

const getLabelMatchingAbbreviation = (normalizedLabel, abbreviations) => {
  const matchingAbbreviation = _.find(
    _.keys(abbreviations),
    (abbreviation) =>
      abbreviation === normalizedLabel ||
      new RegExp(`^${abbreviation}[- ]`).test(normalizedLabel) ||
      new RegExp(`[- ]${abbreviation}$`).test(normalizedLabel)
  );
  return matchingAbbreviation ? abbreviations[matchingAbbreviation] : null;
};

module.exports = {
  normalize: (proportions, totalWithValue, { aliases = {}, abbreviations = {} }) => {
    const mergedLabels = {};

    return _.chain(proportions)
      .map((proportion, proportionIndex) => {
        // Ignore merged proportions
        if (mergedLabels[proportion.label]) {
          return null;
        }

        // Ignore unknown values
        if (proportion.label === '') {
          return null;
        }

        // Add following proportion' values that should be merged to current proportion's value
        const normalizedLabel = proportion.label.toLowerCase();
        const followingProportions = _.drop(proportions, proportionIndex + 1);
        const normalizedCount = followingProportions.reduce((currentCount, followingProportion) => {
          const normalizedFollowingLabel = followingProportion.label.toLowerCase();
          if (
            aliases[normalizedFollowingLabel] === normalizedLabel ||
            normalizedFollowingLabel.includes(normalizedLabel) ||
            getLabelMatchingAbbreviation(normalizedFollowingLabel, abbreviations) === normalizedLabel
          ) {
            mergedLabels[followingProportion.label] = true;
            return currentCount + followingProportion.count;
          }
          return currentCount;
        }, proportion.count);

        return {
          ...proportion,
          count: normalizedCount,
          percentage: utils.renderPercentage(normalizedCount, totalWithValue),
        };
      })
      .compact()
      .sortBy('count')
      .reverse()
      .value();
  },
};
