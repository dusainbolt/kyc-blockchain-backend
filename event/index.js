const Web3 = require("web3");
const projectCreated = require("./projectCreated");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const ABIJson = require("../contracts/KYCPlatform.json");

var contractAddress = config.contractAddress;

const web3 = new Web3("ws://localhost:8545");

const contractKYC = new web3.eth.Contract(ABIJson.abi, contractAddress);

let options = {
  filter: {
    value: [],
  },
  fromBlock: "latest", //Number || "earliest" || "pending" || "latest"
  toBlock: "latest",
};

function eventListener() {
  contractKYC.events
    .ProjectCreated(options)
    .on("data", projectCreated)
    .on("changed", (changed) => console.log(changed))
    .on("error", (err) => console.log("Error", err))
    .on("connected", (str) => console.log(str));
}
module.exports = eventListener;
