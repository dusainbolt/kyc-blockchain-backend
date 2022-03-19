const { KycModel } = require('../models');

module.exports = {
  create: function (conditions) {
    return KycModel.create(conditions);
  },

  updateOne: function (conditions, newData) {
    return KycModel.updateOne(conditions, {
      $set: newData,
    });
  },

  findOne: function (conditions) {
    return KycModel.findOne(conditions);
  },

  count: function (conditions) {
    return KycModel.countDocuments(conditions);
  },

  search: function (conditions, pagination, sortConditions) {
    const conditionPopulate = {
      path: 'userId',
      select: 'address',
    };

    return KycModel.find(conditions)
      .populate(conditionPopulate)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .sort(sortConditions);
  },

  getCredential: function (body) {
    return {
      ...(body.email && {
        email: body.email,
      }),
      ...(body.phoneNumber && {
        phoneNumber: body.phoneNumber,
      }),
      firstName: body.firstName,
      lastName: body.lastName,
      fullName: body.fullName,
      gender: body.gender,
      birthday: body.birthday,
      address: body.address,
      nowAddress: body.nowAddress,
    };
  },
};
