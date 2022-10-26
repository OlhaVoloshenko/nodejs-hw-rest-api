const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

// router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));
// router.put(
//   "/:contactId",
//   validateBody(contactsSchema.addSchema),
//   ctrlWrapper(ctrl.updateById)
// );

// router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
