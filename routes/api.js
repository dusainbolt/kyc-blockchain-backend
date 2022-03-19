const express = require('express');
const router = express.Router();
const {
  userController,
  projectController,
  kycController,
} = require('../controllers');

const { validateUser, validateProject, validateKyc } = require('../requests');

const auth = require('../middleware/auth');

/* User APIs */
router.post('/user/login', validateUser.verifySign(), userController.login);

/* Project APIs */
router.post(
  '/project/create',
  validateProject.create(),
  auth,
  projectController.create
);

/* KYC APIs */
router.post('/kyc/create', auth, validateKyc.create(), kycController.create);
router.put('/kyc/update', auth, validateKyc.update(), kycController.update);
router.get('/kyc/info', auth, kycController.retrieve);
router.get('/kyc/search', auth, kycController.search);
router.patch('/kyc/request', auth, kycController.requestConfirmKyc);
router.patch(
  '/kyc/confirm',
  auth,
  validateKyc.getKyc(),
  kycController.confirmKyc
);

module.exports = router;
