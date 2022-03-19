const { ProjectModel } = require('../models');

module.exports = {
  create: function (conditions) {
    return ProjectModel.create(conditions);
  },

  findOne: function (conditions) {
    return ProjectModel.findOne(conditions);
  },

  updateOne: function (id, newData) {
    return ProjectModel.updateOne(id, { $set: newData });
  },

  // findAndDelete:  function (conditions) {
  //   const project = await ProjectModel.findOneAndDelete(conditions);

  //   if (project) {
  //     const user = await UserModel.findOne({ _id: conditions.adminId });
  //     const index = user.projects.indexOf(project._id);
  //     if (index > -1) {
  //       user.projects.splice(index, 1); // 2nd parameter means remove one item only
  //     }
  //     user.save();
  //   }
  //   return project;
  // },

  count: function (conditions) {
    return ProjectModel.countDocuments(conditions);
  },

  search: function (conditions, pagination) {
    return ProjectModel.find(conditions)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .sort({ createdAt: -1 });
  },

  // validateProject: async function (userId, projectId) {
  //   try {
  //     const user = await UserModel.findOne({ _id: userId });
  //     const index = user.projects.indexOf(projectId);
  //     if (index > -1) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     _logger.error(new Error(error));
  //     return false;
  //   }
  // },
};
