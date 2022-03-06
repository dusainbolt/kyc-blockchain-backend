const Web3 = require('web3');
const ethers = require('ethers');
const crypto = require('crypto-js');

const BN = ethers.BigNumber;

const _ = {
  publicKey: '0xac4540E3EeB8e55931735dd1C064C2ba50ac44e0',
  privateKey: '6fbaa03222fad84cec1abc8a517ad4b9e1bcd5dfd37c47bf4f745068946b06a5',
  APP_KEY: '997183d0aa6b358a4a9db',
};

const web3Polygon = new Web3();

const msgObj = {
  originalMessage: 'KYCPlatform Signature',
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
