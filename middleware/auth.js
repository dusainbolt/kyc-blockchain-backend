const jwt = require("jsonwebtoken");
const { handlerRequire, handlerAuthentication } = require('../utils/response_handler');

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return handlerRequire(req, res, res.__('TOKEN_AUTH_REQUIRE'));
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return handlerAuthentication(req, res, res.__('INVALID_TOKEN'));
  }
  return next();
};

module.exports = verifyToken;
