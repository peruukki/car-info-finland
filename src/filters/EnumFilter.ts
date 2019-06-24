import _ = require('lodash');

class EnumFilter implements Filter {
  filter(record: CsvRecord, property: CarProperty, acceptedValues: string[][]): boolean {
    const flattenedAcceptedValues = _.flatten(acceptedValues);
    return _.includes(flattenedAcceptedValues, record[property.columnName]);
  }
}

export = EnumFilter;
