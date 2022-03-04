const apidoc = require('./apidoc');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');

module.exports = {
  ...apidoc,
  ...servers,
  ...components,
  ...tags,
};
