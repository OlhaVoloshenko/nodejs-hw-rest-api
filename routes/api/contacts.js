const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const contactsSchema = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validateBody(contactsSchema.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  validateBody(contactsSchema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
