// const { validationResult } = require('express-validator');
const { validateRouter } = require('../utils/helper');
// const consts = require('../utils/consts');
const { handlerError, handlerSuccess } = require('../utils/response_handler');
// const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');
const projectRepository = require('../repositories/project_repository');
const userRepository = require('../repositories/user_repository');
// const ObjectID = require('mongodb').ObjectID;

module.exports = {
  classname: 'ProjectController',

  create: async (req, res, next) => {
    // validate the input parameters
    const validate = validateRouter(req);

    // handle the error, stop
    if (validate) {
      return handlerError(req, res, validate);
    }
    // valid parameters
    try {
      // find user
      const user = await userRepository.findOne({
        address: req.body.userAddress,
      });
      // check user exist
      if (!user) {
        return handlerError(req, res, res.__('USER_NOT_EXIST'));
      }
      // create apikey for project
      const apiKey = uuidv4();
      // prepare to create project
      const credentials = {
        name: req.body.name,
        apiKey: apiKey,
        userId: req.user._id,
      };
      // create user
      const result = await projectRepository.create(credentials);
      if (result) {
        return handlerSuccess(req, res, result, res.__('REGISTER_SUCCESS'));
      } else {
        return handlerError(req, res, res.__('UNABLE_TO_REGISTER'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      next(error);
    }
  },

  // retrieve: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }

  //   // valid parameters
  //   try {
  //     // retrieve project record
  //     let project = await projectRepository.findOne({ _id: new ObjectID(req.query.id), adminId: req.user.userId });

  //     if (project) {
  //       return handlerSuccess(req, res, project, res.__('RETRIEVE_SUCCESS'));
  //     } else {
  //       return handlerError(req, res, res.__('UNABLE_TO_GET_INFO'));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // update: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }
  //   // valid parameters
  //   try {
  //     if (!await projectRepository.validateProject(req.user.userId, req.body.id)){
  //       return handlerError(req, res, res.__('INVALID_PROJECT_OF_USER'));
  //     }
  //     // prepare to update project
  //     let projectInfo = {
  //       note: req.body.note
  //     };

  //     let result = await projectRepository.updateOne({ _id: new ObjectID(req.body.id) }, projectInfo);

  //     // send response
  //     if (result && result.ok == 1) {
  //       return handlerSuccess(req, res, result, res.__('UPDATE_SUCCESS'));
  //     } else {
  //       return handlerError(req, res, res.__('UNABLE_TO_UPDATE'));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // delete: async (req, res, next) => {
  //   // validate the input parameters
  //   const validate = validateRouter(req);

  //   // handle the error, stop
  //   if (validate) {
  //     return handlerError(req, res, validate);
  //   }

  //   // valid parameters
  //   try {
  //     if (!await projectRepository.validateProject(req.user.userId, req.query.id)){
  //       return handlerError(req, res, res.__('INVALID_PROJECT_OF_USER'));
  //     }

  //     // delete project record
  //     let project = await projectRepository.findAndDelete({ _id: new ObjectID(req.query.id), adminId: req.user.userId });

  //     if (project) {
  //       return handlerSuccess(req, res, project, res.__('DELETE_SUCCESS'));
  //     } else {
  //       return handlerError(req, res, res.__('UNABLE_TO_DELETE'));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },

  // search: async (req, res, next) => {
  //   try {
  //     // prepare pagination
  //     let pagination = {
  //       page: parseInt(req.query.page) || 1,
  //       pageSize: parseInt(req.query.pageSize) || 10,
  //     };

  //     // prepare search conditions
  //     let conditions = [];

  //     if (req.query.name && req.query.name.length > 0) {
  //       let regexName = new RegExp(req.query.name, 'i') // i for case insensitive
  //       conditions.push({ name: {$regex: regexName} });
  //     }
  //     if (req.query.note && req.query.note.length > 0) {
  //       let regexNote = new RegExp(req.query.note, 'i') // i for case insensitive
  //       conditions.push({ note: {$regex: regexNote} });
  //     }

  //     // retrieve project record
  //     if (conditions.length > 0) {
  //       conditions = { adminId: req.user.userId, $or: conditions };
  //     } else {
  //       conditions = { adminId: req.user.userId };
  //     }

  //     let dataTable = await projectRepository.search(conditions, pagination);
  //     let projectCount = await projectRepository.count(conditions);
  //     let paging = paginationGenerator(pagination, projectCount);

  //     if (dataTable) {
  //       return handlerSuccess(req, res, { dataTable, paging }, res.__('RETRIEVE_SUCCESS'));
  //     } else {
  //       return handlerError(req, res, res.__('UNABLE_TO_GET_INFO'));
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     next(error);
  //   }
  // },
};
