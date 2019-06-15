const _ = require('lodash');

module.exports = class Proportions {
  constructor() {
    this.countsByValue = {};
  }

  static renderPercentage(count, total) {
    const percentage = (count / total) * 100;
    const decimalCount = percentage > 0 && percentage < 1 ? 1 : 0;
    return `${percentage.toFixed(decimalCount)} %`;
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

  getProportions(keys, totalWithValue, labelFn) {
    return keys.map((key) => ({
      label: labelFn(key),
      count: this.countsByValue[key] || 0,
      percentage: Proportions.renderPercentage(this.countsByValue[key] || 0, totalWithValue),
    }));
  }

  getProportionsByLabels(valueLabels, totalWithValue, language) {
    return this.getProportions(_.keys(valueLabels), totalWithValue, (key) => valueLabels[key][language]);
  }

  getProportionsByValues(totalWithValue) {
    return this.getProportions(_.keys(this.countsByValue), totalWithValue, _.identity);
  }

  renderNonEmptyResults(info, language) {
    const total = _.chain(this.countsByValue)
      .values()
      .sum()
      .value();
    const totalWithValue = _.chain(this.countsByValue)
      .omit('')
      .values()
      .sum()
      .value();

    const proportions = info.valueLabels
      ? this.getProportionsByLabels(info.valueLabels, totalWithValue, language)
      : this.getProportionsByValues(totalWithValue);

    console.log(
      `Cars with a known ${info.name}: ${totalWithValue}/${total} (${Proportions.renderPercentage(
        totalWithValue,
        total
      )}).`
    );
    console.log(`Proportions for ${info.name}:`);
    _.chain(proportions)
      .sortBy('count')
      .reverse()
      .forEach((proportion, index) =>
        console.log(Proportions.renderProportion(proportion, index + 1, proportions.length))
      )
      .value();
  }

  processRecord(value) {
    this.countsByValue[value] = this.countsByValue[value] ? this.countsByValue[value] + 1 : 1;
  }

  processResults(info, language) {
    console.log();

    if (_.values(this.countsByValue).length === 0) {
      Proportions.renderEmptyResults(info);
    } else {
      this.renderNonEmptyResults(info, language);
    }
  }
};
