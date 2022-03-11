const { body } = require('express-validator');
const { KycModel } = require('../models');

module.exports = {
  classname: 'ValidateKyc',

  create: () => {
    return [
      body('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing email parameter.')
        .isEmail()
        .withMessage('Invalid email.')
        .custom((value) => {
          return KycModel.findOne({ email: value }).then((project) => {
            if (project) {
              const msg = 'Email is already registered.';
              return Promise.reject(msg);
            }
          });
        }),
      body('firstName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing firstName parameter.'),
      body('lastName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing lastName parameter.'),
      body('fullName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing fullName parameter.'),
      body('gender').not().isEmpty().withMessage('Missing gender parameter.'),
      body('phoneNumber')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing fullName parameter.')
        .isMobilePhone()
        .withMessage('Invalid mobile phone.')
        .custom((value) => {
          return KycModel.findOne({ phoneNumber: value }).then((project) => {
            if (project) {
              const msg = 'phoneNumber is already registered.';
              return Promise.reject(msg);
            }
          });
        }),
      body('address')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing address parameter.'),
      body('nowAdress')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing nowAdress parameter.'),
    ];
  },
};
