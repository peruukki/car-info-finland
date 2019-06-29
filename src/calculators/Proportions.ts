import _ = require('lodash');
import Utils = require('./Utils');

class Proportions implements Calculator {
  private readonly countsByValue: { [value: string]: number } = {};

  constructor(private readonly property: CarProperty) {}

  static renderProportion(proportion: Proportion, labelLength: number): string {
    return `${proportion.label.padEnd(labelLength)} ${proportion.percentage.padStart(6)} (${proportion.count})`;
  }

  static renderProportionWithOrdinal(
    proportion: Proportion,
    labelLength: number,
    ordinal: number,
    ordinalCount: number
  ): string {
    const indentation = _.repeat(' ', ordinalCount.toString().length - ordinal.toString().length);
    return `${indentation}${ordinal}. ${Proportions.renderProportion(proportion, labelLength)}`;
  }

  static renderProportions(proportions: Proportion[], withOrdinal: boolean): void {
    const proportionWithLongestLabel = _.maxBy(proportions, (proportion) => proportion.label.length);
    const labelLength = _.get(proportionWithLongestLabel, 'label.length', 0);
    proportions.forEach((proportion, index) => {
      const renderedProportion = withOrdinal
        ? Proportions.renderProportionWithOrdinal(proportion, labelLength, index + 1, proportions.length)
        : Proportions.renderProportion(proportion, labelLength);
      console.log(renderedProportion);
    });
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

    const sortByCount = !this.property.valueCategories;
    const proportions = _.chain(
      this.property.valueLabels
        ? this.getProportionsByLabels(this.property.valueLabels, totalWithValue, language)
        : this.getProportionsByValues(totalWithValue)
    )
      .reject((proportion) => proportion.label === '')
      .orderBy(
        sortByCount ? 'count' : (proportion) => _.findIndex(this.property.valueCategories, { label: proportion.label }),
        sortByCount ? 'desc' : 'asc'
      )
      .value();

    console.log(
      `Cars with a known ${this.property.name}: ${totalWithValue}/${total} (${Utils.renderPercentage(
        totalWithValue,
        total
      )}).`
    );
    console.log(`Proportions for ${this.property.name}:`);
    const normalizedProportions = normalizer
      ? normalizer.normalize(proportions, totalWithValue, this.property.normalizerMappings)
      : proportions;
    Proportions.renderProportions(normalizedProportions, sortByCount);
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
