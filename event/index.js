const Web3 = require('web3');
const projectCreated = require('./projectCreated');
const kycCreated = require('./kycCreated');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const ABIJson = require('../contracts/KYCPlatform.json');

const contractAddress = config.contractAddress;

const web3 = new Web3(config.providerUrl);

const contractKYC = new web3.eth.Contract(ABIJson.abi, contractAddress);

const options = {
  filter: {
    value: [],
  },
  // fromBlock: 0,
  // fromBlock: 'latest', //Number || "earliest" || "pending" || "latest"
  // toBlock: 'latest',
};

function eventListener() {
  contractKYC.events
    .ProjectCreated(options)
    .on('data', projectCreated)
    .on('changed', (changed) => console.log(changed))
    .on('error', (err) => console.log('Error', err))
    .on('connected', (str) => console.log(str));
  contractKYC.events
    .KycCreated(options)
    .on('data', kycCreated)
    .on('changed', (changed) => console.log(changed))
    .on('error', (err) => console.log('Error', err))
    .on('connected', (str) => console.log(str));
}
module.exports = eventListener;
// "providerUrl": "wss://rinkeby.infura.io/ws/v3/565ba53dd573484da0eb2adc77968b97",
// "contractAddress": "0x43Fd5B58646d033A5a31F1073Fd919c34Cdc7c72"

// "providerUrl": "ws://localhost:8545",
// "contractAddress": "0x5FbDB2315678afecb367f032d93F642f64180aa3"
