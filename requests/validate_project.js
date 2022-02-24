var {body, query, validationResult, param} = require('express-validator');
var { ProjectModel, UserModel } = require('../models');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  classname: 'ValidateProject',

  create: () => {
    return [
      body('name')
        .not().isEmpty()
        .withMessage('Missing name parameter.')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Name is between 4-20 characters.')
        .custom((value) => {
          return ProjectModel.findOne({ name: value }).then((project) => {
            if (project) {
              return Promise.reject('Name is already registered.');
            }
          });
        }),

      body('note')
        .not().isEmpty()
        .withMessage('Missing note parameter.'),
    ];
  },

  update: () => {
    return [
      body('id')
        .not().isEmpty()
        .withMessage('Missing id parameter.')
        .custom((value) => {
          if (!ObjectID.isValid(value)) {
            return Promise.reject('Invalid id.');
          } else {
            return Promise.resolve(true);
          }
        }),
    ];
  },

  retrieve: () => {
    return [
      query('id')
        .not().isEmpty()
        .withMessage('Missing id parameter.')
        .custom((value) => {
          if (!ObjectID.isValid(value)) {
            return Promise.reject('Invalid id.');
          } else {
            return Promise.resolve(true);
          }
        }),
    ];
  },
};
