require("dotenv").config();

var { UserModel } = require("../models");
const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const users = [
  {
    username: "superAdmin",
    email: "super_admin@gmail.com",
    password: "123456",
    isAdmin: true,
  },
  {
    username: "projectAdmin",
    email: "project_admin@gmail.com",
    password: "123456",
    isAdmin: true,
  },
];

// connect to mongodb
mongoose.connect(config.host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//save your data. this is an async operation
//after you make sure you seeded all the users, disconnect automatically
async function seederUsers() {
  try {
    const usersData = await UserModel.insertMany(users);
    if (usersData.length === users.length) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  } catch (e) {
    console.log("SEED ERROR: ", e);
  }
  process.exit(1);
}

seederUsers();
