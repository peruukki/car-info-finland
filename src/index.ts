import _ = require('lodash');
import program = require('commander');
import csv = require('csv-parser');
import fs = require('fs');

import Tendencies = require('./calculators/Tendencies');
import Proportions = require('./calculators/Proportions');

import EnumFilter = require('./filters/EnumFilter');

import brand = require('./carProperties/brand');
import color = require('./carProperties/color');
import co2 = require('./carProperties/co2');
import length = require('./carProperties/length');
import powerSource = require('./carProperties/powerSource');
import vehicleClass = require('./carProperties/vehicleClass');
import width = require('./carProperties/width');

import ProportionNormalizer = require('./normalizers/ProportionNormalizer');

let count = 0;

const progressLabel = 'Cars processed: ';
const progressIndex = progressLabel.length;

function printProgress(recordCount: number): void {
  (process.stdout as any).cursorTo(progressIndex); // cursorTo is missing from WriteStream typings
  process.stdout.write(recordCount.toString());
}

function passesFilters(record: CsvRecord, propertyFilters: PropertyFilter[]): boolean {
  return _.every(propertyFilters, (propertyFilter) =>
    propertyFilter.filter.filter(record, propertyFilter.property, propertyFilter.acceptedValues)
  );
}

function processData(
  filename: string,
  filters: PropertyFilter[],
  calculations: PropertyCalculation[],
  language: string
): void {
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
const calculations: PropertyCalculation[] = [
  { calculator: new Proportions(), property: color },
  { calculator: new Tendencies(), property: length },
  { calculator: new Tendencies(), property: width },
  { calculator: new Tendencies(), property: co2 },
  { calculator: new Proportions(), property: powerSource },
  { calculator: new Proportions(), property: brand, normalizer: new ProportionNormalizer() },
];

function validateOptions(cmd: any): any {
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
    processData(filename, filters, calculations, language);
  });
program.parse(process.argv);
