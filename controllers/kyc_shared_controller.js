const { handlerSuccess, handlerError } = require('../utils/response_handler');
const { renderPaginateSort, paginationGenerator } = require('../utils/helper');
const { kycSharedRepository } = require('../repositories');

module.exports = {
  classname: 'KycSharedController',

  search: async (req, res) => {
    try {
      const userId = req.user.userId;
      // prepare pagination & sort conditions
      const { pagination, sortConditions } = renderPaginateSort(req.query);

      // prepare search conditions
      const conditions = { userId };

      const data = await kycSharedRepository.search(
        conditions,
        pagination,
        sortConditions
      );

      const projectCount = await kycSharedRepository.count(conditions);
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
