import _ = require('lodash');
import Utils = require('./Utils');

class Proportions implements Calculator {
  private readonly countsByValue: { [value: string]: number } = {};

  constructor(private readonly property: CarProperty) {}

  static renderProportion(proportion: Proportion, ordinal: number, ordinalCount: number): string {
    const indentation = _.repeat(' ', ordinalCount.toString().length - ordinal.toString().length);
    return `${indentation}${ordinal}. ${proportion.label.padEnd(20)} ${proportion.percentage.padStart(7)} (${
      proportion.count
    })`;
  }

  renderEmptyResults(): void {
    console.log(`No cars matched the filters, cannot show ${this.property.name} information.`);
  }

  getProportions(keys: string[], totalWithValue: number, labelFn: (key: string) => string): Proportion[] {
    return keys.map((key) => ({
      label: labelFn(key),
      count: this.countsByValue[key] || 0,
      percentage: Utils.renderPercentage(this.countsByValue[key] || 0, totalWithValue),
    }));
  }

  getProportionsByLabels(valueLabels: ValueLabels, totalWithValue: number, language: string): Proportion[] {
    return this.getProportions(_.keys(valueLabels), totalWithValue, (key) => valueLabels[key][language]);
  }

  getProportionsByValues(totalWithValue: number): Proportion[] {
    return this.getProportions(_.keys(this.countsByValue), totalWithValue, _.identity);
  }

  renderNonEmptyResults(normalizer: Normalizer, language: string): void {
    const total = _.chain(this.countsByValue)
      .values()
      .sum()
      .value();
    const totalWithValue = _.chain(this.countsByValue)
      .omit('')
      .values()
      .sum()
      .value();

    const proportions = _.chain(
      this.property.valueLabels
        ? this.getProportionsByLabels(this.property.valueLabels, totalWithValue, language)
        : this.getProportionsByValues(totalWithValue)
    )
      .reject((proportion) => proportion.label === '')
      .sortBy('count')
      .reverse()
      .value();

    console.log(
      `Cars with a known ${this.property.name}: ${totalWithValue}/${total} (${Utils.renderPercentage(
        totalWithValue,
        total
      )}).`
    );
    console.log(`Proportions for ${this.property.name}:`);
    const normalizedProportions = normalizer
      ? normalizer.normalize(proportions, totalWithValue, this.property.normalizer)
      : proportions;
    normalizedProportions.forEach((proportion, index) =>
      console.log(Proportions.renderProportion(proportion, index + 1, proportions.length))
    );
  }

  getCategoryKey(valueCategories: ValueCategory[], value: string): string {
    const valueNumber = Number(value);
    if (!valueNumber) {
      return '';
    }
    const valueCategory = _.find(valueCategories, (category) => {
      const minMatch = !category.min || valueNumber >= category.min;
      const maxMatch = !category.max || valueNumber <= category.max;
      return minMatch && maxMatch;
    });
    return valueCategory ? valueCategory.label : '';
  }

  processRecord(value: string): void {
    const key = this.property.valueCategories ? this.getCategoryKey(this.property.valueCategories, value) : value;
    this.countsByValue[key] = this.countsByValue[key] ? this.countsByValue[key] + 1 : 1;
  }

  processResults(normalizer: Normalizer, language: string): void {
    console.log();

    if (_.values(this.countsByValue).length === 0) {
      this.renderEmptyResults();
    } else {
      this.renderNonEmptyResults(normalizer, language);
    }
  }
}

export = Proportions;
