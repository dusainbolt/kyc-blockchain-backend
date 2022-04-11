const { kycSharedModel } = require('../models');

module.exports = {
  create: function (conditions) {
    return kycSharedModel.create(conditions);
  },
  count: function (conditions) {
    return kycSharedModel.countDocuments(conditions);
  },
  findOne: function (conditions) {
    return kycSharedModel.findOne(conditions);
  },
  search: function (conditions, pagination, sortConditions) {
    return kycSharedModel
      .find(conditions)
      .populate({ path: 'projectId', select: 'avatar name' })
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .sort(sortConditions);
  },
};
