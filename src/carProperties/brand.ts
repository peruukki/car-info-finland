import { CarProperty } from '../types';

const mercedesBenz = 'mercedes-benz';
const possl = 'pössl';
const volkswagen = 'volkswagen';

const property: CarProperty = {
  name: 'brand',
  columnName: 'merkkiSelvakielinen',
  normalizer: {
    aliases: new Map([
      ['bww', 'bmw'],
      ['mercedes', mercedesBenz],
      ['poessl', possl],
      ['pösll', possl],
      ['tesla', 'tesla motors'],
      ['volswagen', volkswagen],
      ['vw', volkswagen],
      ['wolkswagen', volkswagen],
    ]),
    abbreviations: new Map([['vw', volkswagen], ['mb', mercedesBenz], ['m-b', mercedesBenz]]),
  },
};

export = property;
