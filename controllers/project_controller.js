const { handlerError, handlerSuccess } = require('../utils/response_handler');
const { v4: uuidv4 } = require('uuid');
const projectRepository = require('../repositories/project_repository');
const Web3Utils = require('../utils/web3');
const kyc_repository = require('../repositories/kyc_repository');
const { renderPaginateSort, paginationGenerator } = require('../utils/helper');
const userRepository = require('../repositories/user_repository');

module.exports = {
  classname: 'ProjectController',

  create: async (req, res) => {
    try {
      // create apikey for project
      const apiKey = uuidv4();
      // prepare to create project
      const messageHash = kyc_repository.getCreateKYCMessageHash(
        apiKey,
        req.user.address
      );

      const signature = userRepository.signWithPrivateKey(messageHash);

      const encodeABI = Web3Utils.encodeABIDeployProject(apiKey, signature);

      const credentials = {
        name: req.body.name,
        apiKey,
        avatar: req.body.avatar,
        userId: req.user.userId,
        encodeABI,
      };

      // create user
      const result = await projectRepository.create(credentials);
      return handlerSuccess(req, res, result, res.__('REGISTER_SUCCESS'));
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },

  search: async (req, res) => {
    try {
      const userId = req.user.userId;
      // prepare pagination & sort conditions
      const { pagination, sortConditions } = renderPaginateSort(req.query);

      // prepare search conditions
      const conditions = { userId };

      const data = await projectRepository.search(
        conditions,
        pagination,
        sortConditions
      );

      const projectCount = await projectRepository.count(conditions);
      const paging = paginationGenerator(pagination, projectCount);

      return handlerSuccess(
        req,
        res,
        { data, paging },
        res.__('RETRIEVE_SUCCESS')
      );
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },

  retrieve: async (req, res) => {
    // valid parameters
    try {
      // retrieve project record
      const project = await projectRepository.findOne({
        _id: req.query.id,
      });

      if (project) {
        return handlerSuccess(req, res, project, res.__('RETRIEVE_SUCCESS'));
      } else {
        return handlerError(req, res, res.__('UNABLE_TO_GET_INFO'));
      }
    } catch (error) {
      _logger.error(new Error(error));
      return handlerError(req, res, error.message);
    }
  },

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
  //     return handlerError(req, res, error.message);
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
  //     return handlerError(req, res, error.message);
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
  //     return handlerError(req, res, error.message);
  //   }
  // },
};
