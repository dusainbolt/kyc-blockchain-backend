const getKycInfo = require('./get_info_kyc');
const searchKycInfo = require('./search_info_kyc');
const kycUpdate = require('./update_kyc');
const requestKycConfirm = require('./request_kyc_confirm');

module.exports = {
  '/kyc/info': {
    ...getKycInfo,
  },
  '/kyc/search': {
    ...searchKycInfo,
  },
  '/kyc/update': {
    ...kycUpdate,
  },
  '/kyc/request': {
    ...requestKycConfirm,
  },
};
