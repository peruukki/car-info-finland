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

  static renderProportion(row, index, indexCount) {
    const indentation = indexCount < 10 || index >= 9 ? '' : ' ';
    return `${indentation}${index + 1}. ${row.label.padEnd(20)} ${row.percentage.padStart(7)} (${row.count})`;
  }

  static renderEmptyResults(info) {
    console.log(`No cars matched the filters, cannot show ${info.name} information.`);
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
    const proportions = _.chain(info.valueLabels)
      .keys()
      .map((key) => ({
        label: info.valueLabels[key][language],
        count: this.countsByValue[key] || 0,
        percentage: Proportions.renderPercentage(this.countsByValue[key] || 0, totalWithValue),
      }))
      .sortBy('count')
      .reverse()
      .value();

    console.log(
      `Cars with a known ${info.name}: ${totalWithValue}/${total} (${Proportions.renderPercentage(
        totalWithValue,
        total
      )}).`
    );
    console.log(`Proportions for ${info.name}:`);
    proportions.forEach((proportion, index) => console.log(Proportions.renderProportion(proportion, index)));
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
