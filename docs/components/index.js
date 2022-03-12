const User = require('./user');
const Project = require('./project');
const Security = require('./security');

module.exports = {
  components: {
    schemas: {
      ...User,
      ...Project,
    },
    ...Security,
  },
};
