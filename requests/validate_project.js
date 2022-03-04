const { body, query } = require('express-validator');
const { ProjectModel } = require('../models');
const ObjectID = require('mongodb').ObjectID;
const web3 = require('web3');

module.exports = {
  classname: 'ValidateProject',

  create: () => {
    return [
      body('name')
        .not()
        .isEmpty()
        .withMessage('Missing name parameter.')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Name is between 4-20 characters.')
        .custom((value) => {
          return ProjectModel.findOne({ name: value }).then((project) => {
            if (project) {
              const msg = 'Name is already registered.';
              return Promise.reject(msg);
            }
          });
        }),

      body('userAddress')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing userAddress parameter.')
        .custom((value) => {
          const isAdress = web3.utils.isAddress(value);
          return isAdress
            ? Promise.resolve(true)
            : Promise.reject('Invalid address');
        }),
    ];
  },

  update: () => {
    return [
      body('id')
        .not()
        .isEmpty()
        .withMessage('Missing id parameter.')
        .custom((value) => {
          if (!ObjectID.isValid(value)) {
            const msg = 'Invalid id.';
            return Promise.reject(msg);
          } else {
            return Promise.resolve(true);
          }
        }),
    ];
  },

  retrieve: () => {
    return [
      query('id')
        .not()
        .isEmpty()
        .withMessage('Missing id parameter.')
        .custom((value) => {
          if (!ObjectID.isValid(value)) {
            const msg = 'Invalid id.';
            return Promise.reject(msg);
          } else {
            return Promise.resolve(true);
          }
        }),
    ];
  },
};
