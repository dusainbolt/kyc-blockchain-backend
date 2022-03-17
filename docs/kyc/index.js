const getKycInfo = require('./get_info_kyc');
const searchKycInfo = require('./search_info_kyc');

module.exports = {
  '/kyc/info': {
    ...getKycInfo,
  },
  '/kyc/search': {
    ...searchKycInfo,
  },
};
