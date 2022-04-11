const express = require('express');
const router = express.Router();
const {
  userController,
  projectController,
  kycController,
  kycHistoryController,
  kycSharedController,
} = require('../controllers');

const { validateUser, validateProject, validateKyc } = require('../requests');

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth_admin');
const validate = require('../middleware/validate');
const authAPIKey = require('../middleware/auth_api_key');

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

router.get(
  '/project',
  validateProject.retrieve(),
  validate,
  projectController.retrieve
);

router.get('/project/search', auth, projectController.search);

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

/* KYC History APIs */
router.get('/kyc-history/search', auth, kycHistoryController.search);
/* KYC Shared APIs */
router.get('/kyc-shared/search', auth, kycSharedController.search);
router.get(
  '/kyc-shared/check',
  validateUser.checkShareKyc(),
  validate,
  authAPIKey,
  kycSharedController.check
);

module.exports = router;
