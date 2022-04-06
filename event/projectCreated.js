/* eslint-disable no-unsafe-optional-chaining */
const projectRepository = require('../repositories/project_repository');
const { DB_STATUS } = require('../utils/consts');
const Web3Utils = require('../utils/web3');

async function kycCreated(event) {
  try {
    const { projectId, projectIndex } = event?.returnValues;
    const project = await projectRepository.findOne({ apiKey: projectId });

    project.status = DB_STATUS.ACTIVE;
    project.projectIndex = projectIndex;
    project.encodeShareKycABI = Web3Utils.encodeABIShareKYC(projectIndex);
    await project.save();
  } catch (error) {
    _logger.error(new Error(error));
  }
}

module.exports = kycCreated;
