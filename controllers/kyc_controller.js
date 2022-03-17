const { validateRouter } = require('../utils/helper');
const { handlerSuccess, handlerError } = require('../utils/response_handler');
const { KYC_STATUS } = require('../utils/consts');
const kycRepository = require('../repositories/kyc_repository');

module.exports = {
  classname: 'KycController',

  retrieve: async (req, res, next) => {
    // validate the input parameters
    const validate = validateRouter(req, res);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }

    // valid parameters
    try {
      // retrieve kyc record
      const kyc = await kycRepository.findOne({
        userId: req.user.userId,
      });

      if (kyc) {
        return handlerSuccess(req, res, kyc, res.__('RETRIEVE_SUCCESS'));
      } else {
        return handlerSuccess(req, res, {}, res.__('UNABLE_TO_GET_INFO'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      next(error);
    }
  },

  create: async (req, res) => {
    // validate the input parameters
    const validate = validateRouter(req, res);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }

    try {
      //get userId from user verified access token
      const userId = req.user.userId;

      // prepare to create kyc
      const credentials = {
        userId,
        status: KYC_STATUS.EDITING,
        ...kycRepository.getCredential(req.body),
      };

      //create KYC
      const result = await kycRepository.create(credentials);
      if (result) {
        return handlerSuccess(req, res, result, res.__('Success'));
      } else {
        return handlerError(req, res, res.__('UNABLE_TO_CREATE'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      next(error);
    }
  },

  update: async (req, res) => {
    // validate the input parameters
    const validate = validateRouter(req, res);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }
    //valid parameters
    try {
      //get userId from user verified access token
      const userId = req.user.userId;

      //check status kyc
      const kyc = await kycRepository.findOne({ userId });

      if (!(kyc.status == KYC_STATUS.EDITING)) {
        return handlerError(req, res, res.__('UNABLE_TO_UPDATE'));
      }
      // prepare to update kyc
      const credentials = {
        ...kycRepository.getCredential(req.body),
      };
      //update KYC
      const result = await kycRepository.updateOne({ userId }, credentials);
      if (result) {
        return handlerSuccess(req, res, result, res.__('UPDATE_SUCCESS'));
      } else {
        return handlerError(req, res, res.__('UNABLE_TO_UPDATE'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      next(error);
    }
  },

  requestConfirmKyc: async (req, res) => {
    try {
      const userId = req.user.userId;

      const kyc = await kycRepository.findOne({
        userId,
      });

      // check status kyc
      if (kyc.status != KYC_STATUS.EDITING) {
        return handlerError(req, res, res.__('UNABLE_TO_REQUEST'));
      }
      // update status kyc
      const result = await kycRepository.updateOne(
        { userId },
        { status: KYC_STATUS.REQUEST }
      );

      if (result) {
        return handlerSuccess(req, res, result, res.__('REQUEST_SUCCESS'));
      } else {
        return handlerError(req, res, res.__('UNABLE_TO_REQUEST'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      next(error);
    }
  },
};
