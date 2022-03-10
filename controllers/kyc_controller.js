const { validateRouter } = require('../utils/helper');
const { handlerSuccess, handlerError } = require('../utils/response_handler');

module.exports = {
  classname: 'KycController',

  create: async (req, res) => {
    // validate the input parameters
    const validate = validateRouter(req, res);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }
  },
};
