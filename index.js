const _ = require('lodash');
const program = require('commander');
const csv = require('csv-parser');
const fs = require('fs');

const Tendencies = require('./calculators/Tendencies');
const Proportions = require('./calculators/Proportions');

const enumFilter = require('./filters/enumFilter');

const brand = require('./info/brand');
const color = require('./info/color');
const co2 = require('./info/co2');
const length = require('./info/length');
const powerSource = require('./info/power-source');
const vehicleClass = require('./info/vehicle-class');
const width = require('./info/width');

let count = 0;

const progressLabel = 'Cars processed: ';
const progressIndex = progressLabel.length;

const printProgress = (recordCount) => {
  process.stdout.cursorTo(progressIndex);
  process.stdout.write(recordCount.toString());
};

const passesFilters = (record, filters) =>
  _.every(filters, (filter) => filter.filterFn(record, filter.info, filter.values));

const processData = (filename, filters, calculations, language) => {
  fs.createReadStream(filename, { encoding: 'latin1' })
    .pipe(csv({ separator: ';' }))
    .on('data', (record) => {
      count += 1;
      if (passesFilters(record, filters)) {
        calculations.forEach((calculation) =>
          calculation.calculator.processRecord(record[calculation.info.columnName])
        );
      }

      printProgress(count);
    })
    .on('end', () => {
      process.stdout.write('\n');
      calculations.forEach((calculation) => calculation.calculator.processResults(calculation.info, language));
    });
};

const filters = [{ filterFn: enumFilter, info: vehicleClass, values: [vehicleClass.filterValues.car] }];
const calculations = [
  { calculator: new Proportions(), info: color },
  { calculator: new Tendencies(), info: length },
  { calculator: new Tendencies(), info: width },
  { calculator: new Tendencies(), info: co2 },
  { calculator: new Proportions(), info: powerSource },
  { calculator: new Proportions(), info: brand },
];

const validateOptions = (cmd) => {
  const { language } = cmd;
  if (!_.includes(['fi', 'sv', 'en'], language)) {
    console.error(`error: invalid language value '${language}', must be one of fi|sv|en`);
    process.exit(1);
  }
  return { language };
};

program
  .command('process <filename>')
  .option('-l, --language <language code>', 'language in which to show info labels: fi|sv|en', 'fi')
  .action((filename, cmd) => {
    const { language } = validateOptions(cmd);
    process.stdout.write(progressLabel);
    processData(filename, filters, calculations, language);
  });
program.parse(process.argv);
