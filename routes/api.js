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
// router.post("/user/create", validateUser.register(), auth, userController.register);
// router.get("/user/get-info", validateUser.retrieve(), auth, userController.retrieve);
// router.post("/user/login", validateUser.login(), userController.login);
// router.patch("/user/update", validateUser.update(), auth, userController.update);
// router.delete("/user/delete", validateUser.retrieve(), auth, userController.delete);
// router.get("/user/search", auth, userController.search);
// router.post("/user/verify-sign", validateUser.verifySign(), userController.verifySign);
router.post('/user/login', validateUser.verifySign(), userController.login);

/* Project APIs */
router.post(
  '/project/create',
  validateProject.create(),
  auth,
  projectController.create
);
// router.get("/project/get-info", validateProject.retrieve(), auth, projectController.retrieve);
// router.patch("/project/update", validateProject.update(), auth, projectController.update);
// router.delete("/project/delete", validateProject.retrieve(), auth, projectController.delete);
// router.get("/project/search", auth, projectController.search);

/* KYC APIs */
router.post('/kyc/create', auth, validateKyc.create(), kycController.create);
router.put('/kyc/update', auth, validateKyc.update(), kycController.update);

module.exports = router;
