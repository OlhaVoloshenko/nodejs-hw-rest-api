const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemasContact } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemasContact.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(schemasContact.addSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(schemasContact.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);
router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

module.exports = router;
