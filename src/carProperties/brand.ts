const mercedesBenz = 'mercedes-benz';
const possl = 'pössl';
const volkswagen = 'volkswagen';

const property: CarProperty = {
  name: 'brand',
  columnName: 'merkkiSelvakielinen',
  normalizerMappings: {
    aliases: {
      bww: 'bmw',
      mercedes: mercedesBenz,
      poessl: possl,
      pösll: possl,
      tesla: 'tesla motors',
      volswagen: volkswagen,
      vw: volkswagen,
      wolkswagen: volkswagen,
    },
    abbreviations: { vw: volkswagen, mb: mercedesBenz, 'm-b': mercedesBenz },
  },
  type: 'Proportions',
};

export = property;
