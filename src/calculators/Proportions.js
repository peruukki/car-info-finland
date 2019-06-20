const _ = require('lodash');
const utils = require('./utils');

module.exports = class Proportions {
  constructor() {
    this.countsByValue = {};
  }

  static renderProportion(proportion, ordinal, ordinalCount) {
    const indentation = _.repeat(' ', ordinalCount.toString().length - ordinal.toString().length);
    return `${indentation}${ordinal}. ${proportion.label.padEnd(20)} ${proportion.percentage.padStart(7)} (${
      proportion.count
    })`;
  }

  static renderEmptyResults(info) {
    console.log(`No cars matched the filters, cannot show ${info.name} information.`);
  }

  static getProportions(keys, countsByValue, totalWithValue, labelFn) {
    return keys.map((key) => ({
      label: labelFn(key),
      count: countsByValue[key] || 0,
      percentage: utils.renderPercentage(countsByValue[key] || 0, totalWithValue),
    }));
  }

  static getProportionsByLabels(valueLabels, countsByValue, totalWithValue, language) {
    return Proportions.getProportions(
      _.keys(valueLabels),
      countsByValue,
      totalWithValue,
      (key) => valueLabels[key][language]
    );
  }

  static getProportionsByValues(countsByValue, totalWithValue) {
    return Proportions.getProportions(_.keys(countsByValue), countsByValue, totalWithValue, _.identity);
  }

  static renderNonEmptyResults(info, countsByValue, normalizer, language) {
    const total = _.chain(countsByValue)
      .values()
      .sum()
      .value();
    const totalWithValue = _.chain(countsByValue)
      .omit('')
      .values()
      .sum()
      .value();

    const proportions = _.chain(
      info.valueLabels
        ? Proportions.getProportionsByLabels(info.valueLabels, countsByValue, totalWithValue, language)
        : Proportions.getProportionsByValues(countsByValue, totalWithValue)
    )
      .sortBy('count')
      .reverse()
      .value();

    console.log(
      `Cars with a known ${info.name}: ${totalWithValue}/${total} (${utils.renderPercentage(totalWithValue, total)}).`
    );
    console.log(`Proportions for ${info.name}:`);
    const normalizedProportions = normalizer
      ? normalizer.normalize(proportions, totalWithValue, info.normalizer)
      : proportions;
    normalizedProportions.forEach((proportion, index) =>
      console.log(Proportions.renderProportion(proportion, index + 1, proportions.length))
    );
  }

  processRecord(value) {
    this.countsByValue[value] = this.countsByValue[value] ? this.countsByValue[value] + 1 : 1;
  }

  processResults(info, normalizer, language) {
    console.log();

    if (_.values(this.countsByValue).length === 0) {
      Proportions.renderEmptyResults(info);
    } else {
      Proportions.renderNonEmptyResults(info, this.countsByValue, normalizer, language);
    }
  }
};
