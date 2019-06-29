const property: CarProperty & WithFilterValues = {
  name: 'vehicle class',
  columnName: 'ajoneuvoluokka',
  filterValues: {
    car: ['M1', 'M1G'],
  },
  type: 'Proportions',
};

export = property;
