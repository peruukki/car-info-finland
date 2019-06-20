const _ = require('lodash');
const bigInt = require('big-integer');
const utils = require('./utils');

module.exports = class Tendencies {
  constructor() {
    this.values = [];
  }

  static calculateMean(validValues) {
    return validValues.length === 0
      ? undefined
      : validValues
          .reduce((currentSum, value) => currentSum.plus(value), bigInt())
          .divide(validValues.length)
          .toJSNumber();
  }

  static calculateMedian(sortedValues) {
    if (sortedValues.length === 0) {
      return undefined;
    }
    if (sortedValues.length % 2 === 1) {
      // middle value
      return sortedValues[(sortedValues.length - 1) / 2];
    }
    // mean of two middle values
    return (sortedValues[sortedValues.length / 2] + sortedValues[sortedValues.length / 2 - 1]) / 2;
  }

  static renderEmptyResults(info) {
    console.log(`No cars matched the filters, cannot show ${info.name} information.`);
  }

  renderNonEmptyResults(info) {
    const validValues = _.compact(this.values);
    const sortedValues = _.sortBy(validValues);

    const mean = Tendencies.calculateMean(validValues);
    const median = Tendencies.calculateMedian(sortedValues);

    console.log(
      `Cars with a known ${info.name}: ${validValues.length}/${this.values.length} (${utils.renderPercentage(
        validValues.length,
        this.values.length
      )}).`
    );
    console.log(`Tendencies for ${info.name}:`);
    console.log(`Mean:   ${mean}`);
    console.log(`Median: ${median}`);
    console.log(`Min:    ${_.first(sortedValues)}`);
    console.log(`Max:    ${_.last(sortedValues)}`);
  }

  processRecord(value) {
    this.values.push(value ? Number(value) : null);
  }

  processResults(info) {
    console.log();

    if (this.values.length === 0) {
      Tendencies.renderEmptyResults(info);
    } else {
      this.renderNonEmptyResults(info);
    }
  }
};
