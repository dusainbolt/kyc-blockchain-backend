const express = require('express');
const router = express.Router();
const {
  userController,
  projectController,
  kycController,
} = require('../controllers');

const { validateUser, validateProject, validateKyc } = require('../requests');

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth_admin');
const validate = require('../middleware/validate');

/* User APIs */
router.post(
  '/user/login',
  validateUser.verifySign(),
  validate,
  userController.login
);

/* Project APIs */
router.post(
  '/project/create',
  validateProject.create(),
  validate,
  auth,
  projectController.create
);

/* KYC APIs */
router.post(
  '/kyc/create',
  auth,
  validateKyc.create(),
  validate,
  kycController.create
);
router.put(
  '/kyc/update',
  validateKyc.update(),
  validate,
  auth,
  kycController.update
);
router.get('/kyc/info', auth, kycController.retrieve);
router.get('/kyc/search', auth, kycController.search);
router.patch('/kyc/request', auth, kycController.requestConfirmKyc);
router.patch(
  '/kyc/confirm',
  validateKyc.getKyc(),
  validate,
  authAdmin,
  kycController.confirmKyc
);
router.get('/kyc/request_deploy', auth, kycController.requestDeploy);

module.exports = router;
