import _ = require('lodash');
import program = require('commander');
import csv = require('csv-parser');
import fs = require('fs');

import Tendencies = require('./calculators/Tendencies');
import Proportions = require('./calculators/Proportions');

import EnumFilter = require('./filters/EnumFilter');

import brand = require('./carProperties/brand');
import color = require('./carProperties/color');
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

function toCalculation(property: PropertyWithNormalizer): PropertyCalculation {
  return {
    ...property,
    calculator: property.property.type === 'Proportions' ? new Proportions() : new Tendencies(),
  };
}

function processData(
  filename: string,
  filters: PropertyFilter[],
  properties: PropertyWithNormalizer[],
  language: string
): void {
  const calculations = properties.map(toCalculation);

  fs.createReadStream(filename, { encoding: 'latin1' })
    .pipe(csv({ separator: ';' }))
    .on('data', (record) => {
      count += 1;
      if (passesFilters(record, filters)) {
        calculations.forEach((calculation) =>
          calculation.calculator.processRecord(record[calculation.property.columnName])
        );
      }

      printProgress(count);
    })
    .on('end', () => {
      process.stdout.write('\n');
      calculations.forEach((calculation) =>
        calculation.calculator.processResults(calculation.property, calculation.normalizer, language)
      );
    });
}

const filters: PropertyFilter[] = [
  { filter: new EnumFilter(), property: vehicleClass, acceptedValues: [vehicleClass.filterValues.car] },
];
const properties: PropertyWithNormalizer[] = [
  { property: color },
  { property: length },
  { property: width },
  { property: co2Value },
  { property: powerSource },
  { property: brand, normalizer: new ProportionNormalizer() },
];

function validateOptions(cmd: CommandLineOptions): CommandLineOptions {
  const { language } = cmd;
  if (!_.includes(['fi', 'sv', 'en'], language)) {
    console.error(`error: invalid language value '${language}', must be one of fi|sv|en`);
    process.exit(1);
  }
  return { language };
}

program
  .command('process <filename>')
  .option('-l, --language <language code>', 'language in which to show info labels: fi|sv|en', 'fi')
  .action((filename, cmd) => {
    const { language } = validateOptions(cmd);
    process.stdout.write(progressLabel);
    processData(filename, filters, properties, language);
  });
program.parse(process.argv);
