const property: CarProperty = {
  name: 'CO2',
  columnName: 'Co2',
  valueCategories: [
    { label: 'A', max: 100 },
    { label: 'B', min: 101, max: 120 },
    { label: 'C', min: 121, max: 130 },
    { label: 'D', min: 131, max: 150 },
    { label: 'E', min: 151, max: 175 },
    { label: 'F', min: 176, max: 200 },
    { label: 'G', min: 201 },
  ],
  type: 'Proportions',
};

export = property;
