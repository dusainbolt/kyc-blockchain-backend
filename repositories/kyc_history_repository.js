const { KycHistoryModel } = require('../models');

module.exports = {
  create: function (conditions) {
    return KycHistoryModel.create(conditions);
  },
};
