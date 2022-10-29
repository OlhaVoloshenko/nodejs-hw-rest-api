const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/ContactsModel");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

// router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));
router.post("/", ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
