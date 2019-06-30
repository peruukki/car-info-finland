import _ = require('lodash');
import program = require('commander');
import csv = require('csv-parser');
import fs = require('fs');

import Tendencies = require('./calculators/Tendencies');
import Proportions = require('./calculators/Proportions');

import EnumFilter = require('./filters/EnumFilter');

import brand = require('./carProperties/brand');
import color = require('./carProperties/color');
import co2EnergyClass = require('./carProperties/co2EnergyClass');
import co2Value = require('./carProperties/co2Value');
import length = require('./carProperties/length');
import powerSource = require('./carProperties/powerSource');
import vehicleClass = require('./carProperties/vehicleClass');
import width = require('./carProperties/width');

import ProportionNormalizer = require('./normalizers/ProportionNormalizer');

let count = 0;

const progressLabel = 'Cars processed: ';
const progressIndex = progressLabel.length;

function printProgress(recordCount: number): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stdout as any).cursorTo(progressIndex); // cursorTo is missing from WriteStream typings
  process.stdout.write(recordCount.toString());
}

function passesFilters(record: CsvRecord, propertyFilters: PropertyFilter[]): boolean {
  return _.every(propertyFilters, (propertyFilter) =>
    propertyFilter.filter.filter(record, propertyFilter.property, propertyFilter.acceptedValues)
  );
}

function getPercentileForValue(property: CarProperty, options: CommandLineOptions): number | undefined {
  return Number(options[property.name]) || undefined;
}

function toCalculation(property: CarProperty, options: CommandLineOptions): PropertyCalculation {
  return {
    ...property,
    calculator: property.type === 'Proportions' ? new Proportions(property) : new Tendencies(property),
    percentileForValue: getPercentileForValue(property, options),
    normalizer: property.type === 'Proportions' && property.normalizerMappings ? new ProportionNormalizer() : undefined,
  };
}

function processData(
  filename: string,
  filters: PropertyFilter[],
  properties: CarProperty[],
  options: CommandLineOptions
): void {
  const calculations = properties.map((property) => toCalculation(property, options));

  fs.createReadStream(filename, { encoding: 'latin1' })
    .pipe(csv({ separator: ';' }))
    .on('data', (record) => {
      count += 1;
      if (passesFilters(record, filters)) {
        calculations.forEach((calculation) => calculation.calculator.processRecord(record[calculation.columnName]));
      }

      printProgress(count);
    })
    .on('end', () => {
      process.stdout.write('\n');
      calculations.forEach((calculation) =>
        calculation.calculator.processResults(options.language, calculation.percentileForValue, calculation.normalizer)
      );
    });
}

const filters: PropertyFilter[] = [
  { filter: new EnumFilter(), property: vehicleClass, acceptedValues: [vehicleClass.filterValues.car] },
];
const properties: CarProperty[] = [color, length, width, co2Value, co2EnergyClass, powerSource, brand];

function validateOptions(cmd: CommandLineOptions): CommandLineOptions {
  const { co2: co2Option, language, length: lengthOption, width: widthOption } = cmd;

  [co2Option, lengthOption, widthOption].forEach((numberOption) => {
    const numberValue = Number(numberOption);
    if (numberValue <= 0) {
      console.error(`error: invalid numeric value '${numberOption}', must be a positive number`);
      process.exit(1);
    }
  });

  if (!_.includes(['fi', 'sv', 'en'], language)) {
    console.error(`error: invalid language value '${language}', must be one of fi|sv|en`);
    process.exit(1);
  }

  return cmd;
}

program
  .command('process <filename>')
  .option('-c, --CO2 <CO2 emissions in g/km>', 'show percentile for given CO2 emissions when compared to other cars')
  .option('-e, --length <length in mm>', 'show percentile for given length when compared to other cars')
  .option('-w, --width <width in mm>', 'show percentile for given width when compared to other cars')
  .option('-l, --language <language code>', 'language in which to show info labels: fi|sv|en', 'fi')
  .action((filename, cmd) => {
    const options = validateOptions(cmd);
    process.stdout.write(progressLabel);
    processData(filename, filters, properties, options);
  });
program.parse(process.argv);
