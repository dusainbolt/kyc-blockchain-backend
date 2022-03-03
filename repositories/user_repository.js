var { UserModel } = require("../models");
var consts = require("../utils/consts");
var mongoose = require("mongoose");
var logger = require("../utils/logger");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var Web3 = require("web3");
var ObjectID = require("mongodb").ObjectID;
var BN = require("ethers").BigNumber;
var AES = require("crypto-js").AES;
var Utf8 = require("crypto-js").enc.Utf8;

var web3 = new Web3();

module.exports = {
  create: async function (newAccountInfo) {
    try {
      let accountInfo = await UserModel.create(newAccountInfo);

      // Create token
      const token = jwt.sign(
        { userId: accountInfo._id, email: newAccountInfo.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.EXPIRED_JWT_TOKEN,
        }
      );

      // save user token
      accountInfo.token = token;

      return accountInfo;
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  findOneLogin: async function (conditions) {
    try {
      let user = await UserModel.findOne({ address: conditions.address });

      if (user) {
        // Create token
        const token = jwt.sign(
          { userId: user._id, adress: user.address, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.EXPIRED_JWT_TOKEN,
          }
        );
        
        //return user(address, token)
        user = {
          address: user.address,
          token: token,
        }

        return user;
      }
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  findOne: async function (conditions) {
    try {
      return await UserModel.findOne(conditions);
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  updateOne: async function (id, newData) {
    try {
      // manually update the password
      if (newData.password) {
        newData.password = await bcrypt.hash(
          newData.password,
          process.env.PASSWORD_SALT_FACTOR * 1
        );
      }

      // update the updatedAt value
      newData.updatedAt = new Date();

      // update and return the result
      let updateResult = await UserModel.updateOne(id, { $set: newData });
      return updateResult;
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  deleteOne: async function (conditions) {
    try {
      return await UserModel.deleteOne(conditions);
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  count: async function (conditions) {
    try {
      let userCount = await UserModel.countDocuments(conditions);
      return userCount;
    } catch (error) {
      logger.error(new Error(error));
      return 0;
    }
  },

  search: async function (conditions, pagination) {
    try {
      let userList = await UserModel.find(conditions)
        .select("_id username email address isAdmin status createdAt updatedAt")
        .skip((pagination.page - 1) * pagination.pageSize)
        .limit(pagination.pageSize)
        .sort({ createdAt: -1 });
      return userList;
    } catch (error) {
      logger.error(new Error(error));
      return [];
    }
  },

  validateAdmin: async function (userId) {
    try {
      let user = await UserModel.findOne({ _id: new ObjectID(userId) });
      if (user.isAdmin) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error(new Error(error));
      return false;
    }
  },

  checkSignature: async function (address, message, signature) {
    // verify message
    const bytes = AES.decrypt(message, process.env.APP_KEY);
    const { dateTime, originalMessage } = JSON.parse(bytes.toString(Utf8));

    const correctMsg = originalMessage === process.env.MESSAGE_SIGNATURE;
    const differentTime = BN.from(Date.now()).div(1000).sub(dateTime);
    
    if (
      !correctMsg ||
      !differentTime.gte(0) ||
      !differentTime.lte(process.env.EXPIRED_MESSAGE_SIGN)
    ) {
      return { result: false, message: "INVALID_SIGNATURE" };
    }

    // verify signature
    const recover = await web3.eth.accounts.recover(message, signature);
    const recoverConvert = web3.utils.toChecksumAddress(recover);
    address = web3.utils.toChecksumAddress(address);
    console.log("recover: ", recover);
    if (recoverConvert && recoverConvert === address) {
      return { result: true, message: "Success" };
    } else {
      return { result: false, message: "INVALID_SIGNATURE" };
    }
  },
};
