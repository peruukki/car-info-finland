const _ = require('lodash');

module.exports = (record, info, values) => {
  const acceptedValues = _.flatten(values);
  return _.includes(acceptedValues, record[info.columnName]);
};
