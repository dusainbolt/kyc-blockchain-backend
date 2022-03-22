const Web3 = require('web3');
const KYCAbi = require('../contracts/KYCPlatform.json');

const web3 = new Web3('ws://localhost:8545');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const _ = {
  publicKey: '0x7c081f25d0c685753c0762772c93EE29D257278B',
  privateKey:
    '49c480b02586f00d80ac5d1ea824bfc4490826f33ebc720d06d7a385a1551fe2',
  encodeABI:
    '0xfa397d22000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002e516d567a39425476794b52596e7437696e457946734d4e4863734a547477327039504d435a57545155394a396d330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041bb86aa7819756a0a6cee587ea52e75858414d1cbe7e3e47bf61bd863e82b7d40552a36012e643ed4b73775608874ab4aa4d237e4efd1f736094acd9493d3ed381b00000000000000000000000000000000000000000000000000000000000000',
};

const kycPlatform = new web3.eth.Contract(KYCAbi.abi, config.contractAddress);

const creaKycMember = async () => {
  try {
    console.log('owner: ', await kycPlatform.methods.owner().call());

    // get gas price
    const gasPrice = await web3.eth.getGasPrice();
    // estimate gas
    const signature =
      '0x058bc66f0fa29c199e00597918819506e5929780d7b247bc530cd55ed13c219c31fb5c94fe0cd75abe4af1bf194d3e74387c1474bb7ddd72837345df215ba4f71b';
    // const encodedABI = await RewardPool.methods
    //   .claimReward("1000000", "0", signature)
    //   .encodeABI();

    // console.log("==> encodeABI: ", encodedABI == _.encodeABI);

    const gas = await kycPlatform.methods
      .createKYCMember(
        'bafybeib6gjm35dvovwvvqpt6afniqdytwnchnqkaskwyakrluy5mydlwf4',
        signature
      )
      .estimateGas({ from: _.publicKey });

    // create tx transaction
    const tx = {
      from: _.publicKey,
      to: _.contractAddress,
      gas,
      gasPrice,
      data: _.encodeABI,
      nonce: web3.eth.getTransactionCount(_.publicKey),
    };

    // sign transaction and send
    const signedTx = await web3.eth.accounts.signTransaction(tx, _.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log('receipt =====> ', receipt);
    return receipt.transactionHash;
  } catch (error) {
    console.log(`ERROR: `, error);
  }
};

creaKycMember();
