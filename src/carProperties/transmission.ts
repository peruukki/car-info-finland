const property: CarProperty = {
  name: 'transmission',
  columnName: 'vaihteisto',
  valueLabels: {
    1: { fi: 'Käsivalintainen', sv: 'Manuell', en: 'Manual' },
    2: { fi: 'Automaattinen', sv: 'Automatisk', en: 'Automatic' },
    3: { fi: 'Portaaton', sv: 'Steglös', en: 'Stepless' },
    4: { fi: 'Käsivalintainen/automaattinen', sv: 'Manuell/automatisk', en: 'Manual/automatic' },
    5: { fi: 'Variaattori', sv: 'Variator', en: 'Variator' },
    6: { fi: 'Muuttuvavälityksinen', sv: 'Variabel utväxling', en: 'Continuously variable (?)' },
    7: { fi: 'Jalkavalintainen', sv: 'Fotväxlad', en: 'Foot-operated' },
    X: { fi: 'Ei sovellettavissa', sv: 'Ej tillämpligt', en: 'Not applicable' },
    Y: { fi: 'Muu', sv: 'Annan', en: 'Other' },
  },
  type: 'Proportions',
};

export = property;
