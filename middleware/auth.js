const jwt = require('jsonwebtoken');
const {
  handlerRequire,
  handlerAuthentication,
} = require('../utils/response_handler');
const userRepository = require('../repositories/user_repository');
const { DB_STATUS } = require('../utils/consts');

const config = process.env;

const authUser = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return handlerRequire(req, res, res.__('TOKEN_AUTH_REQUIRE'));
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userRepository.findOneById(decoded.userId);

    if (DB_STATUS.ACTIVE == user.status) {
      req.user = decoded;
    } else {
      return handlerAuthentication(req, res, res.__('INVALID_TOKEN'));
    }
  } catch (err) {
    return handlerAuthentication(req, res, res.__('INVALID_TOKEN'));
  }
  return next();
};

module.exports = authUser;
