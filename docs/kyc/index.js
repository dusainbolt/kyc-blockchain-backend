// const createUser = require("./create_user");
// const getUserInfo = require("./get_user");
const getKycInfo = require('./get_info_kyc');
const kycUpdate = require('./update_kyc');
const requestKycConfirm = require('./request_kyc_confirm');
// const userDelete = require("./delete_user");
// const searchUser = require("./search_user");

module.exports = {
  // "/user/create": {
  //   ...createUser,
  // },
  // "/user/get-info": {
  //   ...getUserInfo,
  // },
  '/kyc/info': {
    ...getKycInfo,
  },
  '/kyc/update': {
    ...kycUpdate,
  },
  '/kyc/request': {
    ...requestKycConfirm,
  },
  // "/user/delete": {
  //   ...userDelete,
  // },
  // "/user/search": {
  //   ...searchUser,
  // },
};
