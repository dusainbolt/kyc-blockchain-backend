const { validateRouter } = require('../utils/helper');
const { handlerSuccess, handlerError } = require('../utils/response_handler');
const { KYC_STATUS } = require('../utils/consts');
const kycRepository = require('../repositories/kyc_repository');

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

    const credentials = {
      userId: userId,
      status: KYC_STATUS.PENDING,
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

    //create KYC
    const result = await kycRepository.create(credentials);
    if (result) {
      return handlerSuccess(req, res, result, res.__('REQUEST_SENT'));
    } else {
      return handlerError(req, res, res.__('UNABLE_TO_CREATE'));
    }
  },
};
