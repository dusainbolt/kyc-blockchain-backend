const Web3 = require('web3');
const ethers = require('ethers');
const crypto = require('crypto-js');

const BN = ethers.BigNumber;

const _ = {
  publicKey: '',
  privateKey: '',
  APP_KEY: '997183d0aa6b358a4a9db',
};

const web3Polygon = new Web3();

const msgObj = {
  originalMessage: 'Metareum Signature',
  dateTime: BN.from(Date.now()).div(1000).toString(),
};

const messageHash = crypto.AES.encrypt(
  JSON.stringify(msgObj),
  _.APP_KEY
).toString();

const signature = web3Polygon.eth.accounts.sign(
  messageHash,
  _.privateKey
).signature;

console.log('===> messageHash: ', messageHash);

console.log('===> signature: ', signature);
