/* eslint-disable no-unsafe-optional-chaining */
const kycRepository = require('../repositories/kyc_repository');
const userRepository = require('../repositories/user_repository');
const kycHistoryRepository = require('../repositories/kyc_history_repository');

const { KYC_STATUS } = require('../utils/consts');

async function projectCreated(event) {
  console.log('event', event);
  try {
    const { userAddress, uid } = event?.returnValues;
    const user = await userRepository.findOne({ address: userAddress });
    const kyc = await kycRepository.findOne({
      userId: user._id,
    });
    const creKycHistory = {
      kycId: kyc._id,
      userId: user._id,
      status: KYC_STATUS.DEPLOYED,
      message: event.transactionHash,
    };

    kyc.uid = uid;
    await Promise.all([kyc.save(), kycHistoryRepository.create(creKycHistory)]);
  } catch (error) {
    _logger.error(new Error(error));
  }
}
module.exports = projectCreated;

//  {
//   removed: false,
//   logIndex: 0,
//   transactionIndex: 0,
//   transactionHash: '0x0ffa85c6bc92b27f1a7d7ba6dd8d47a98aa19933fd057e00da973f9be601ecec',
//   blockHash: '0xc20ddeb6d610dbfdc75d8103ef5e76bedf99b48d6135512ca3e53826af999b09',
//   blockNumber: 2,
//   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
//   id: 'log_67b22fa8',
//   returnValues: Result {
//     '0': 'QmQJqbkNjqJU7A194KTpLjPLYA6je3oxnxre5R1P4bv7gY',
//     '1': '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//     '2': '1648135385',
//     uid: 'QmQJqbkNjqJU7A194KTpLjPLYA6je3oxnxre5R1P4bv7gY',
//     userAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//     kycExpireTime: '1648135385'
//   },
//   event: 'KycCreated',
//   signature: '0xa038f8a857c01feb8216609a7e3c15ce623dd71fc1f46882e546b99a25e6e7bb',
//   raw: {
//     data: '0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb9226600000000000000000000000000000000000000000000000000000000623c8cd9000000000000000000000000000000000000000000000000000000000000002e516d514a71626b4e6a714a5537413139344b54704c6a504c5941366a65336f786e78726535523150346276376759000000000000000000000000000000000000',
//     topics: [
//       '0xa038f8a857c01feb8216609a7e3c15ce623dd71fc1f46882e546b99a25e6e7bb'
//     ]
//   }
// }
