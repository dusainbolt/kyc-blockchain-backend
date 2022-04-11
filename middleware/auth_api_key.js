const { projectRepository } = require('../repositories');
const {
  handlerRequire,
  handlerAuthentication,
} = require('../utils/response_handler');
const uuidValidate = require('uuid').validate;
const uuidVersion = require('uuid').version;

const authAPIKey = async (req, res, next) => {
  const apiKey =
    req.body.apiKey || req.query.apiKey || req.headers['x-api-key'];

  if (!apiKey) {
    return handlerRequire(req, res, res.__('APIKEY_AUTH_REQUIRE'));
  }

  try {
    const project = await projectRepository.verifyAPIKey(apiKey);
    const uuid = project?.apiKey;
    console.log('===> ', uuid);

    if (project && uuidValidate(uuid) && uuidVersion(uuid) === 4) {
      req.projectId = project._id;
    } else {
      return handlerAuthentication(req, res, res.__('INVALID_APIKEY'));
    }
  } catch (err) {
    return handlerAuthentication(req, res, res.__('INVALID_APIKEY'));
  }
  return next();
};

module.exports = authAPIKey;
