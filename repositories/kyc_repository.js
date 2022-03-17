const { KycModel } = require('../models');

module.exports = {
  create: async function (conditions) {
    try {
      return await KycModel.create(conditions);
    } catch (error) {
      _logger.error(new Error(error));
    }
  },

  updateOne: async function (conditions, newData) {
    try {
      // update and return the result
      return await KycModel.updateOne(conditions, {
        $set: newData,
      });
    } catch (error) {
      _logger.error(new Error(error));
    }
  },

  findOne: async function (conditions) {
    try {
      return await KycModel.findOne(conditions);
    } catch (error) {
      _logger.error(new Error(error));
    }
  },

  count: async function (conditions) {
    try {
      return await KycModel.countDocuments(conditions);
    } catch (error) {
      _logger.error(new Error(error));
      return 0;
    }
  },

  search: async function (conditions, pagination, sortConditions) {
    try {
      const conditionPopulate = {
        path: 'userId',
        select: 'address',
      };

      return await KycModel.find(conditions)
        .populate(conditionPopulate)
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize)
        .sort(sortConditions);
    } catch (error) {
      _logger.error(new Error(error));
      return [];
    }
  },

  getCredential: function (body) {
    try {
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
    } catch (error) {
      _logger.error(new Error(error));
    }
  },
};
