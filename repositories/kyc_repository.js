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
};
