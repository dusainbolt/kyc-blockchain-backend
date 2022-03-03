var { body, query, validationResult, param } = require("express-validator");
var { UserModel } = require("../models");
var ObjectID = require("mongodb").ObjectID;
var web3 = require("web3");

module.exports = {
  classname: "ValidateUser",

  register: () => {
    return [
      body("username")
        .not()
        .isEmpty()
        .withMessage("Missing username parameter.")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Username is between 4-20 characters.")
        .custom((value) => {
          return UserModel.findOne({ username: value }).then((user) => {
            if (user) {
              return Promise.reject("Username is already registered.");
            }
          });
        }),

      body("email")
        .not()
        .isEmpty()
        .withMessage("Missing email parameter.")
        .trim()
        .isEmail()
        .withMessage("Invalid email.")
        .custom((value) => {
          return UserModel.findOne({ email: value }).then((user) => {
            if (user) {
              return Promise.reject("Email is already registered.");
            }
          });
        }),

      body("password")
        .not()
        .isEmpty()
        .withMessage("Missing password parameter."),
    ];
  },

  update: () => {
    return [
      body("id")
        .not()
        .isEmpty()
        .withMessage("Missing id parameter.")
        .custom((value) => {
          if (!ObjectID.isValid(value)) {
            return Promise.reject("Invalid id.");
          } else {
            return Promise.resolve(true);
          }
        }),
    ];
  },

  retrieve: () => {
    return [
      query("id")
        .not()
        .isEmpty()
        .withMessage("Missing id parameter.")
        .custom((value) => {
          if (!ObjectID.isValid(value)) {
            return Promise.reject("Invalid id.");
          } else {
            return Promise.resolve(true);
          }
        }),
    ];
  },

  login: () => {
    return [
      body("email")
        .not()
        .isEmpty()
        .withMessage("Missing email parameter.")
        .trim()
        .isEmail()
        .withMessage("Invalid email."),

      body("password")
        .not()
        .isEmpty()
        .withMessage("Missing password parameter."),
    ];
  },

  verifySign: () => {
    return [
      body("address")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Missing address parameter.")
        .custom((value) => {
          const isAddress = web3.utils.isAddress(value);
          return isAddress
            ? Promise.resolve(true)
            : Promise.reject("Invalid address");
        }),
      body("messageHash").trim().not().isEmpty().withMessage("Missing messageHash parameter."),
      body("signature").trim().not().isEmpty().withMessage("Missing signature parameter."),
    ];
  },
};
