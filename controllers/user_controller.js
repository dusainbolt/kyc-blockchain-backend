const { validateRouter } = require('../utils/helper');
// const consts = require("../utils/consts");
const { handlerSuccess, handlerError } = require('../utils/response_handler');
// const logger = require("../utils/logger");

const userRepository = require('../repositories/user_repository');
// const ObjectID = require("mongodb").ObjectID;

module.exports = {
  classname: 'UserController',

  // register: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req, res);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }

  //   // valid parameters
  //   try {
  //     // validate admin
  //     if (!(await userRepository.validateAdmin(req.user.userId))) {
  //       return handlerError(req, res, res.__("NOT_ENOUGH_PERMISSION"));
  //     }
  //     // prepare to register
  //     let newAccountInfo = {
  //       username: req.body.username,
  //       email: req.body.email,
  //       password: req.body.password,
  //       ...(req.body?.address && {address: req.body.address}),
  //     };

  //     let result = await userRepository.create(newAccountInfo);

  //     // send response
  //     if (result) {
  //       // hide the password field before returning
  //       result.password = "";

  //       return handlerSuccess(req, res, result, res.__("REGISTER_SUCCESS"));
  //     } else {
  //       return handlerError(req, res, res.__("UNABLE_TO_REGISTER"));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  login: async (req, res, next) => {
    // validate the input parameters
    const validate = validateRouter(req, res);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }

    // valid parameters
    try {
      // prepare to login
      const accountLogin = {
        address: req.body.address,
        messageHash: req.body.messageHash,
        signature: req.body.signature,
        role: req.body.role,
      };

      // check signature
      const checkSignature = await userRepository.checkSignature(
        accountLogin.address,
        accountLogin.messageHash,
        accountLogin.signature
      );
      if (!checkSignature.result) {
        return handlerError(req, res, res.__('INVALID_SIGNATURE'));
      }

      // retrieve user record
      let user = await userRepository.findOne({
        address: accountLogin.address,
      });

      //create user if user does not exist
      if (!user) {
        user = await userRepository.create({
          address: accountLogin.address,
        });
      }

      // check role's user if login account has role
      if (accountLogin.role && !(user.role == accountLogin.role)) {
        return handlerError(req, res, res.__('INVALID_ROLE'));
      }

      //create token
      const result = await userRepository.signJWT(user);

      if (result) {
        return handlerSuccess(req, res, result, res.__('Success'));
      } else {
        return handlerError(req, res, res.__('UNABLE_TO_GET_INFO'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      next(error);
    }
  },

  // retrieve: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req, res);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }

  //   // valid parameters
  //   try {
  //     // validate admin
  //     if (
  //       req.user.userId != req.query.id &&
  //       !(await userRepository.validateAdmin(req.user.userId))
  //     ) {
  //       return handlerError(req, res, res.__("NOT_ENOUGH_PERMISSION"));
  //     }
  //     // retrieve user record
  //     let user = await userRepository.findOne({
  //       _id: new ObjectID(req.query.id),
  //     });

  //     if (user) {
  //       // hide the password field before returning
  //       user.password = "";

  //       return handlerSuccess(req, res, user, res.__("RETRIEVE_SUCCESS"));
  //     } else {
  //       return handlerError(req, res, res.__("UNABLE_TO_GET_INFO"));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // update: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req, res);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }

  //   // valid parameters
  //   try {
  //     if (
  //       req.user.userId != req.body.id &&
  //       !(await userRepository.validateAdmin(req.user.userId))
  //     ) {
  //       return handlerError(req, res, res.__("NOT_ENOUGH_PERMISSION"));
  //     }
  //     // prepare to register
  //     let newAccountInfo = {
  //       password: req.body.password,
  //       address: req.body.address,
  //     };

  //     let result = await userRepository.updateOne(
  //       { _id: new ObjectID(req.body.id) },
  //       newAccountInfo
  //     );

  //     // send response
  //     if (result && result.ok == 1) {
  //       return handlerSuccess(req, res, result, res.__("UPDATE_SUCCESS"));
  //     } else {
  //       return handlerError(req, res, res.__("UNABLE_TO_UPDATE"));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // delete: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req, res);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }

  //   // valid parameters
  //   try {
  //     // validate admin
  //     if (!(await userRepository.validateAdmin(req.user.userId))) {
  //       return handlerError(req, res, res.__("NOT_ENOUGH_PERMISSION"));
  //     }
  //     // delete user record
  //     let user = await userRepository.deleteOne({
  //       _id: new ObjectID(req.query.id),
  //     });

  //     if (user && user.deletedCount == 1) {
  //       return handlerSuccess(req, res, user, res.__("DELETE_SUCCESS"));
  //     } else {
  //       return handlerError(req, res, res.__("UNABLE_TO_DELETE"));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // search: async (req, res, next) => {
  //   // validate admin
  //   if (!(await userRepository.validateAdmin(req.user.userId))) {
  //     return handlerError(req, res, res.__("NOT_ENOUGH_PERMISSION"));
  //   }
  //   try {
  //     // prepare pagination
  //     let pagination = {
  //       page: parseInt(req.query.page) || 1,
  //       pageSize: parseInt(req.query.pageSize) || 10,
  //     };

  //     // prepare search conditions
  //     let conditions = [];

  //     if (req.query.username && req.query.username.length > 0) {
  //       conditions.push({ username: req.query.username });
  //     }
  //     if (req.query.email && req.query.email.length > 0) {
  //       conditions.push({ email: req.query.email });
  //     }
  //     if (req.query.address && req.query.address.length > 0) {
  //       conditions.push({ address: req.query.address });
  //     }

  //     // retrieve user record
  //     if (conditions.length > 0) {
  //       conditions = { $or: conditions };
  //     } else {
  //       conditions = {};
  //     }

  //     let dataTable = await userRepository.search(conditions, pagination);
  //     let userCount = await userRepository.count(conditions);
  //     let paging = paginationGenerator(pagination, userCount);

  //     if (dataTable) {
  //       return handlerSuccess(
  //         req,
  //         res,
  //         { dataTable, paging },
  //         res.__("RETRIEVE_SUCCESS")
  //       );
  //     } else {
  //       return handlerError(req, res, res.__("UNABLE_TO_GET_INFO"));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // verifySign: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req, res);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }
  //   // Handle verify signature
  //   try {
  //     const { address, msg, sig } = req.body;
  //     const verify = await userRepository.checkSignature(address, msg, sig);
  //     if (!verify.result) {
  //       return handlerError(req, res, res.__(verify.message));
  //     }
  //     return handlerSuccess(req, res, { address }, res.__(verify.message));
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },
};
