 var { validateRouter, paginationGenerator } = require("../utils/helper");
// var consts = require("../utils/consts");
 var { handlerSuccess, handlerError } = require("../utils/response_handler");
// var logger = require("../utils/logger");

 var userRepository = require("../repositories/user_repository");
// var ObjectID = require("mongodb").ObjectID;

module.exports = {
  classname: "UserController",

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
  //     logger.error(new Error(error));
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

    
    //valid parameters
    try {
      // prepare to login
      let accountLogin = {
        address: req.body.address,
        messageHash: req.body.messageHash,
        signature: req.body.signature,
      };
      // retrieve user record
      let user = await userRepository.findOneLogin(accountLogin);

      if (user) {
        return handlerSuccess(req, res, user, res.__("Success"));
      } else {
        return handlerError(req, res, res.__("UNABLE_TO_GET_INFO"));
      }
    } catch (error) {
      logger.error(new Error(error));
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
  //     logger.error(new Error(error));
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
  //     logger.error(new Error(error));
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
  //     logger.error(new Error(error));
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
  //     logger.error(new Error(error));
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
  //     logger.error(new Error(error));
  //     next(error);
  //   }
  // },
};
