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
  updateOne: async function (id, newData) {
    try {
      // update and return the result
      const updateResult = await KycModel.updateOne(id, { $set: newData });
      return updateResult;
    } catch (error) {
      _logger.error(new Error(error));
    }
  },
};
