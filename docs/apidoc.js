const usersPath = require('./users');
const projectsPath = require('./projects');

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Metareum API",
    version: "1.0.0",
    description: "APIs for metareum ecosystem",
    termsOfService: "http://example.com/terms/",
    contact: {
      name: "API Support",
      url: "http://www.example.com/support",
      email: "support@example.com",
    },
  },
  paths: {
    ...usersPath,
    ...projectsPath
  }
}