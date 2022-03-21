const {
  validateRouter,
  renderPaginateSort,
  paginationGenerator,
  renderKeyCondition,
} = require('../utils/helper');
const { handlerSuccess, handlerError } = require('../utils/response_handler');
const { KYC_STATUS } = require('../utils/consts');
const kycRepository = require('../repositories/kyc_repository');
const kycHistoryRepository = require('../repositories/kyc_history_repository');

module.exports = {
  classname: 'KycController',

  retrieve: async (req, res) => {
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
      return handlerError(req, res, error.message);
    }
  },

  create: async (req, res) => {
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

      return handlerSuccess(req, res, result, res.__('Success'));
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },

  update: async (req, res) => {
    try {
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
      return handlerSuccess(req, res, result, res.__('UPDATE_SUCCESS'));
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },

  search: async (req, res) => {
    try {
      // prepare pagination & sort conditions
      const { pagination, sortConditions } = renderPaginateSort(req.query);

      // prepare search conditions
      const conditions = renderKeyCondition(req.query, 'email');

      const data = await kycRepository.search(
        conditions,
        pagination,
        sortConditions
      );

      const projectCount = await kycRepository.count(conditions);
      const paging = paginationGenerator(pagination, projectCount);

      return handlerSuccess(
        req,
        res,
        { data, paging },
        res.__('RETRIEVE_SUCCESS')
      );
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
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
      kyc.status = KYC_STATUS.REQUEST;

      // prepare to create kyc history
      const creKycHistory = {
        kycId: kyc._id,
        userId,
        status: KYC_STATUS.REQUEST,
        message: '',
      };

      await Promise.all([
        kyc.save(),
        kycHistoryRepository.create(creKycHistory),
      ]);

      return handlerSuccess(req, res, true, res.__('REQUEST_SUCCESS'));
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },

  confirmKyc: async (req, res) => {
    try {
      const userId = req.admin.userId;
      const kyc = await kycRepository.findOneById(req.body.kycId);

      // check status kyc
      if (kyc.status != KYC_STATUS.REQUEST) {
        return handlerError(req, res, res.__('UNABLE_TO_REQUEST'));
      }

      // change status kyc
      kyc.status = req.body.status;
      // prepare to create kyc history
      const creKycHistory = {
        kycId: kyc._id,
        userId,
        status: req.body.status,
        message: req.body.message || '',
      };

      await Promise.all([
        kyc.save(),
        kycHistoryRepository.create(creKycHistory),
      ]);

      return handlerSuccess(req, res, true, res.__('REQUEST_SUCCESS'));
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },
};
