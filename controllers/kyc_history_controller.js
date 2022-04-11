const { handlerSuccess, handlerError } = require('../utils/response_handler');
const kycHistoryRepository = require('../repositories/kyc_history_repository');
const { renderPaginateSort, paginationGenerator } = require('../utils/helper');

module.exports = {
  classname: 'KycHistoryController',

  search: async (req, res) => {
    try {
      const userId = req.user.userId;
      // prepare pagination & sort conditions
      const { pagination, sortConditions } = renderPaginateSort(req.query);

      // prepare search conditions
      const conditions = { userId };

      const data = await kycHistoryRepository.search(
        conditions,
        pagination,
        sortConditions
      );

      const projectCount = await kycHistoryRepository.count(conditions);
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
};
