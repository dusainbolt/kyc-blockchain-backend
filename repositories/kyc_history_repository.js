const { KycHistoryModel } = require('../models');

module.exports = {
  create: function (conditions) {
    return KycHistoryModel.create(conditions);
  },

  findOne: function (conditions) {
    return KycHistoryModel.findOne(conditions);
  },

  count: function (conditions) {
    return KycHistoryModel.countDocuments(conditions);
  },

  search: function (conditions, pagination, sortConditions) {
    console.log('sortConditions: ', sortConditions);
    return KycHistoryModel.find(conditions)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .sort(sortConditions);
  },
};
