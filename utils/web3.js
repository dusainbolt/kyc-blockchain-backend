const Web3 = require('web3');
const kycABI = require('../contracts/KYCPlatform.json');

const web3 = new Web3();

class Web3Utils {
  static encodeABIDeploy(uid, signature) {
    const contractKYC = new web3.eth.Contract(
      kycABI.abi,
      _config.contractAddress
    );

    return contractKYC.methods.createKYCMember(uid, signature).encodeABI();
  }

  static encodeABIDeployProject(apiKey, signature) {
    const contractKYC = new web3.eth.Contract(
      kycABI.abi,
      _config.contractAddress
    );

    return contractKYC.methods.createProject(apiKey, signature).encodeABI();
  }

  static toCheckSum(address) {
    return web3.utils.toChecksumAddress(address);
  }
}

module.exports = Web3Utils;
