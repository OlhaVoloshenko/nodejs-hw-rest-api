const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemasUser } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemasUser.loginSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
