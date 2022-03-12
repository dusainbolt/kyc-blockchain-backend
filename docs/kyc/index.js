// const createUser = require("./create_user");
// const getUserInfo = require("./get_user");
const getKycInfo = require('./get_info_kyc');
// const userUpdate = require("./update_user");
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
  // "/user/update": {
  //   ...userUpdate,
  // },
  // "/user/delete": {
  //   ...userDelete,
  // },
  // "/user/search": {
  //   ...searchUser,
  // },
};
