const { validateRouter } = require('../utils/helper');
const { handlerSuccess, handlerError } = require('../utils/response_handler');
const { KYC_STATUS } = require('../utils/consts');

module.exports = {
  classname: 'KycController',

  create: async (req, res) => {
    // validate the input parameters
    const validate = validateRouter(req, res);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }

    //get userId from user verified access token
    const userId = req.user.userId;
    // set status
    const status = KYC_STATUS.PENDING;
    const credentials = {
      userId: userId,
      status: status,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.fullName,
      gender: req.body.gender,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      nowAdress: req.body.nowAdress,
    };

    return handlerSuccess(req, res, credentials, res.__('REQUEST_SENT'));
  },
};
