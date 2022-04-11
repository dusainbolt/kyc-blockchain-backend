/* eslint-disable no-unsafe-optional-chaining */
const kycRepository = require('../repositories/kyc_repository');
const userRepository = require('../repositories/user_repository');
const { projectRepository, kycSharedRepository } = require('../repositories');

async function kycShared(event) {
  try {
    const { projectIndex, userAddress } = event?.returnValues;

    const user = await userRepository.findOne({ address: userAddress });

    const kyc = await kycRepository.findOne({
      userId: user._id,
    });

    const project = await projectRepository.findOne({ projectIndex });

    const creKycShare = {
      kycId: kyc?._id,
      userId: user?._id,
      projectId: project?._id,
      transactionHash: event.transactionHash,
    };

    await kycSharedRepository.create(creKycShare);
  } catch (error) {
    _logger.error(new Error(error));
  }
}
module.exports = kycShared;
