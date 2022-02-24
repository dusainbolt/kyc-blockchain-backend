var express = require("express");
var router = express.Router();
var {
  userController,
  projectController,
} = require("../controllers");

var { 
  validateUser,
  validateProject
} = require("../requests");

var auth = require("../middleware/auth");

/* User APIs */
router.post("/user/create", validateUser.register(), auth, userController.register);
router.get("/user/get-info", validateUser.retrieve(), auth, userController.retrieve);
router.post("/user/login", validateUser.login(), userController.login);
router.patch("/user/update", validateUser.update(), auth, userController.update);
router.delete("/user/delete", validateUser.retrieve(), auth, userController.delete);
router.get("/user/search", auth, userController.search);
router.post("/user/verify-sign", validateUser.verifySign(), userController.verifySign);


/* Project APIs */
router.post("/project/create", validateProject.create(), auth, projectController.create);
router.get("/project/get-info", validateProject.retrieve(), auth, projectController.retrieve);
router.patch("/project/update", validateProject.update(), auth, projectController.update);
router.delete("/project/delete", validateProject.retrieve(), auth, projectController.delete);
router.get("/project/search", auth, projectController.search);

module.exports = router;
