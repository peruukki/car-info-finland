import _ = require('lodash');
import Utils = require('./Utils');

class Proportions implements Calculator {
  private readonly countsByValue: { [value: string]: number } = {};

  static renderProportion(proportion: Proportion, ordinal: number, ordinalCount: number): string {
    const indentation = _.repeat(' ', ordinalCount.toString().length - ordinal.toString().length);
    return `${indentation}${ordinal}. ${proportion.label.padEnd(20)} ${proportion.percentage.padStart(7)} (${
      proportion.count
    })`;
  }

  static renderEmptyResults(property: CarProperty): void {
    console.log(`No cars matched the filters, cannot show ${property.name} information.`);
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

  renderNonEmptyResults(property: CarProperty, normalizer: Normalizer, language: string): void {
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
      property.valueLabels
        ? this.getProportionsByLabels(property.valueLabels, totalWithValue, language)
        : this.getProportionsByValues(totalWithValue)
    )
      .sortBy('count')
      .reverse()
      .value();

    console.log(
      `Cars with a known ${property.name}: ${totalWithValue}/${total} (${Utils.renderPercentage(
        totalWithValue,
        total
      )}).`
    );
    console.log(`Proportions for ${property.name}:`);
    const normalizedProportions = normalizer
      ? normalizer.normalize(proportions, totalWithValue, property.normalizer)
      : proportions;
    normalizedProportions.forEach((proportion, index) =>
      console.log(Proportions.renderProportion(proportion, index + 1, proportions.length))
    );
  }

  processRecord(value: string): void {
    this.countsByValue[value] = this.countsByValue[value] ? this.countsByValue[value] + 1 : 1;
  }

  processResults(property: CarProperty, normalizer: Normalizer, language: string): void {
    console.log();

    if (_.values(this.countsByValue).length === 0) {
      Proportions.renderEmptyResults(property);
    } else {
      this.renderNonEmptyResults(property, normalizer, language);
    }
  }
}

export = Proportions;
