const createUser = require("./create_user");
const getUserInfo = require("./get_user");
const userLogin = require("./login_user");
const userUpdate = require("./update_user");
const userDelete = require("./delete_user");
const searchUser = require("./search_user");

module.exports = {
  "/user/create": {
    ...createUser,
  },
  "/user/get-info": {
    ...getUserInfo,
  },
  "/user/login": {
    ...userLogin,
  },
  "/user/update": {
    ...userUpdate,
  },
  "/user/delete": {
    ...userDelete,
  },
  "/user/search": {
    ...searchUser,
  },
};
