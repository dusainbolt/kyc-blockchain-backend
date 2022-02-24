const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DB_STATUS } = require('../utils/consts');
const PASSWORD_SALT = process.env.PASSWORD_SALT_FACTOR * 1;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 },
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 },
      },
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      default: null
    },
    projects: [{
      type: Schema.Types.ObjectId, 
      ref: 'Project',
    }],
    token: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: DB_STATUS,
      default: DB_STATUS.ACTIVE,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {usePushEach: true},
);
UserSchema.index({ username: 1 }, { background: true });

UserSchema.pre('save', async function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // update the cleartext password with hashed value
  user.password = await bcrypt.hash(user.password, process.env.PASSWORD_SALT_FACTOR * 1);
});

module.exports = mongoose.model('User', UserSchema);
