import _ = require('lodash');
import { CsvRecord, CarProperty } from '../types';

class EnumFilter {
  static filter(record: CsvRecord, property: CarProperty, values: string[]): boolean {
    const acceptedValues = _.flatten(values);
    return _.includes(acceptedValues, record[property.columnName]);
  }
}

export = EnumFilter;
