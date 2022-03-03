require("dotenv").config();

const { UserModel } = require("../models");
const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const user = [
  {
    address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    role: 1
  },
  {
    address: "0xac4540E3EeB8e55931735dd1C064C2ba50ac44e0",
    role: 1
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
    const usersData = await UserModel.insertMany(user);
    if (usersData.length === user.length) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  } catch (e) {
    console.log("SEED ERROR: ", e);
  }
  process.exit(1);
}

seederUsers();
