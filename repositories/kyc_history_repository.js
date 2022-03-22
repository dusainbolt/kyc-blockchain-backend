const { KycHistoryModel } = require('../models');

module.exports = {
  create: function (conditions) {
    return KycHistoryModel.create(conditions);
  },

  findOne: function (conditions) {
    return KycHistoryModel.findOne(conditions);
  },
};
