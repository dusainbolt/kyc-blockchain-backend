const usersPath = require('./users');
const projectsPath = require('./projects');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'KYCPlatform API',
    version: '1.0.0',
    description: 'APIs for KYCPlatform',
    termsOfService: 'http://example.com/terms/',
    contact: {
      name: 'API Support',
      url: 'http://www.example.com/support',
      email: 'support@example.com',
    },
  },
  paths: {
    ...usersPath,
    ...projectsPath,
  },
};
