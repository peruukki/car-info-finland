import _ = require('lodash');
import bigInt = require('big-integer');
import Utils = require('./Utils');

class Tendencies implements Calculator {
  private readonly values: (number | null)[] = [];

  constructor(private readonly property: CarProperty) {}

  static calculateMean(validValues: number[]): number | undefined {
    return validValues.length === 0
      ? undefined
      : validValues
          .reduce((currentSum, value) => currentSum.plus(value), bigInt())
          .divide(validValues.length)
          .toJSNumber();
  }

  static calculateMedian(sortedValues: number[]): number | undefined {
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

  static calculatePercentileIndex(sortedValues: number[], percentileForValue: number): number {
    return _.sortedIndex(sortedValues, percentileForValue);
  }

  renderEmptyResults(): void {
    console.log(`No cars matched the filters, cannot show ${this.property.name} information.`);
  }

  renderNonEmptyResults(percentileForValue?: number): void {
    const validValues = _.compact(this.values);
    const sortedValues = _.sortBy(validValues);

    const mean = Tendencies.calculateMean(validValues);
    const median = Tendencies.calculateMedian(sortedValues);

    console.log(
      `Cars with a known ${this.property.name}: ${validValues.length}/${this.values.length} (${Utils.renderPercentage(
        validValues.length,
        this.values.length
      )}).`
    );
    console.log(`Tendencies for ${this.property.name}:`);
    console.log(`Mean:   ${mean}`);
    console.log(`Median: ${median}`);
    console.log(`Min:    ${_.first(sortedValues)}`);
    console.log(`Max:    ${_.last(sortedValues)}`);

    if (percentileForValue) {
      const percentileIndex = Tendencies.calculatePercentileIndex(sortedValues, percentileForValue);
      console.log(
        `Percentile for ${percentileForValue}: ${Utils.renderPercentage(percentileIndex, validValues.length)}`
      );
    }
  }

  processRecord(value: string): void {
    this.values.push(value ? Number(value) : null);
  }

  processResults(language: string, percentile?: number): void {
    console.log();

    if (this.values.length === 0) {
      this.renderEmptyResults();
    } else {
      this.renderNonEmptyResults(percentile);
    }
  }
}

export = Tendencies;
