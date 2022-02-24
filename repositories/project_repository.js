var { ProjectModel, UserModel } = require('../models');
var consts = require('../utils/consts');
var mongoose = require('mongoose');
var logger = require('../utils/logger');

module.exports = {
  create: async function (projectInfo) {
    try {
      let project = await ProjectModel.create(projectInfo);

      let user = await UserModel.findOne({_id: projectInfo.adminId})
      
      // update project id into user
      user.projects.push(project._id);
      user.save();

      return project;
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  findOne: async function (conditions) {
    try {
      return await ProjectModel.findOne(conditions);
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  updateOne: async function (id, newData) {
    try {
      // update and return the result
      let updateResult = await ProjectModel.updateOne(id, { $set: newData });
      return updateResult;
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  findAndDelete: async function (conditions) {
    try {
      let project = await ProjectModel.findOneAndDelete(conditions);

      if (project) {
        let user = await UserModel.findOne({_id: conditions.adminId});
        const index = user.projects.indexOf(project._id);
        if (index > -1) {
          user.projects.splice(index, 1); // 2nd parameter means remove one item only
        }
        user.save();
      }

      return project;
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  count: async function (conditions) {
    try {
      let userCount = await ProjectModel.countDocuments(conditions);
      return userCount;
    } catch (error) {
      logger.error(new Error(error));
      return 0;
    }
  },

  search: async function (conditions, pagination) {
    try {
      let projectList = await ProjectModel.find(conditions)
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize)
        .sort({createdAt: -1});
      return projectList;
    } catch (error) {
      logger.error(new Error(error));
      return [];
    }
  },

  validateProject: async function (userId, projectId) {
    try {
      let user = await UserModel.findOne({ _id: userId});
      const index = user.projects.indexOf(projectId);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error(new Error(error));
      return false;
    }
  },
}
