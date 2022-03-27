const { body } = require('express-validator');
const { ProjectModel } = require('../models');

module.exports = {
  classname: 'ValidateProject',

  create: () => {
    return [
      body('name')
        .not()
        .isEmpty()
        .withMessage('Missing name parameter.')
        .trim()
        // .isLength({ min: 4, max: 20 })
        // .withMessage('Name is between 4-20 characters.')
        .custom((value) => {
          return ProjectModel.findOne({ name: value }).then((project) => {
            if (project) {
              const msg = 'Name is already registered.';
              return Promise.reject(msg);
            }
          });
        }),
    ];
  },

  // update: () => {
  //   return [
  //     body('id')
  //       .not()
  //       .isEmpty()
  //       .withMessage('Missing id parameter.')
  //       .custom((value) => {
  //         if (!ObjectID.isValid(value)) {
  //           const msg = 'Invalid id.';
  //           return Promise.reject(msg);
  //         } else {
  //           return Promise.resolve(true);
  //         }
  //       }),
  //   ];
  // },

  // retrieve: () => {
  //   return [
  //     query('id')
  //       .not()
  //       .isEmpty()
  //       .withMessage('Missing id parameter.')
  //       .custom((value) => {
  //         if (!ObjectID.isValid(value)) {
  //           const msg = 'Invalid id.';
  //           return Promise.reject(msg);
  //         } else {
  //           return Promise.resolve(true);
  //         }
  //       }),
  //   ];
  // },
};
