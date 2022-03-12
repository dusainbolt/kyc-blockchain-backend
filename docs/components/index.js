const User = require('./user');
const Project = require('./project');
const Security = require('./security');
const Kyc = require('./kyc');

module.exports = {
  components: {
    schemas: {
      ...User,
      ...Project,
      ...Kyc,
    },
    ...Security,
  },
};
