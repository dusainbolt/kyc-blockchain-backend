const { UserModel } = require('../models');
// const consts = require('../utils/consts');
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Web3 = require('web3');
const ObjectID = require('mongodb').ObjectID;
const BN = require('ethers').BigNumber;
const AES = require('crypto-js').AES;
const Utf8 = require('crypto-js').enc.Utf8;

const web3 = new Web3();

module.exports = {
  create: async function (newAccountInfo) {
    return UserModel.create(newAccountInfo);
  },

  findOneLogin: async function (conditions) {
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

      user = {
        address: user.address,
        token: token,
      };

      return user;
    }
  },

  findOne: async function (conditions) {
    return UserModel.findOne(conditions);
  },

  updateOne: async function (id, newData) {
    if (newData.password) {
      newData.password = await bcrypt.hash(
        newData.password,
        process.env.PASSWORD_SALT_FACTOR * 1
      );
    }

    // update and return the result
    const updateResult = await UserModel.updateOne(id, { $set: newData });
    return updateResult;
  },

  deleteOne: async function (conditions) {
    return UserModel.deleteOne(conditions);
  },

  count: async function (conditions) {
    return UserModel.countDocuments(conditions);
  },

  search: async function (conditions, pagination) {
    return UserModel.find(conditions)
      .select('_id username email address isAdmin status createdAt updatedAt')
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize)
      .sort({ createdAt: -1 });
  },

  validateAdmin: async function (userId) {
    const user = await UserModel.findOne({ _id: new ObjectID(userId) });
    if (user.isAdmin) {
      return true;
    } else {
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
      return { result: false, message: 'INVALID_SIGNATURE' };
    }

    // verify signature
    const recover = await web3.eth.accounts.recover(message, signature);
    const recoverConvert = web3.utils.toChecksumAddress(recover);
    address = web3.utils.toChecksumAddress(address);
    if (recoverConvert && recoverConvert === address) {
      return { result: true, message: 'Success' };
    } else {
      return { result: false, message: 'INVALID_SIGNATURE' };
    }
  },

  //sign jwt
  signJWT: async function (credential) {
    // create token
    const token = jwt.sign(
      {
        userId: credential._id,
        adress: credential.address,
        role: credential.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRED_JWT_TOKEN,
      }
    );

    user = {
      address: credential.address,
      token: token,
    };
    return user;
  },
};
