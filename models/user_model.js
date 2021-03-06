const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DB_STATUS, USER_ROLE } = require('../utils/consts');

const UserSchema = new Schema(
  {
    address: {
      type: String,
      unique: true,
      required: false,
    },
    role: {
      type: Number,
      enum: USER_ROLE,
      required: true,
      default: USER_ROLE.USER,
    },
    status: {
      type: Number,
      enum: DB_STATUS,
      default: DB_STATUS.ACTIVE,
    },
  },
  { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
