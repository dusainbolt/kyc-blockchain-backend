const { KycModel } = require('../models');

module.exports = {
  create: async function (conditions) {
    try {
      const kyc = await KycModel.create(conditions);

      return kyc;
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
