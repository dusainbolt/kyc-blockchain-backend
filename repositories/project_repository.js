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

  verifyAPIKey: async function (apiKey) {
    const project = await ProjectModel.findOne({ apiKey: apiKey });
    if (project) {
      return project;
    } else {
      return false;
    }
  },

  count: function (conditions) {
    return ProjectModel.countDocuments(conditions);
  },

  search: function (conditions, pagination, sortConditions) {
    return ProjectModel.find(conditions)
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .sort(sortConditions);
  },
};
