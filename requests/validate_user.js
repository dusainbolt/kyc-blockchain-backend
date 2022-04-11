const { body, query } = require('express-validator');
const web3 = require('web3');

module.exports = {
  classname: 'ValidateUser',

  checkShareKyc: () => {
    return [
      query('userAddress')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing userAddress parameter.')
        .custom((value) => {
          const isAddress = web3.utils.isAddress(value);
          return isAddress
            ? Promise.resolve(true)
            : Promise.reject('Invalid userAddress');
        }),
    ];
  },

  verifySign: () => {
    return [
      body('address')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing address parameter.')
        .custom((value) => {
          const isAddress = web3.utils.isAddress(value);
          return isAddress
            ? Promise.resolve(true)
            : Promise.reject('Invalid address');
        }),
      body('messageHash')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing messageHash parameter.'),
      body('signature')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Missing signature parameter.'),
    ];
  },
};
