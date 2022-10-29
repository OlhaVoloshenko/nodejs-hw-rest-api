// const express = require("express");
// const ctrl = require("../../controllers/contacts");
// const { ctrlWrapper } = require("../../helpers");
// const { validateBody } = require("../../middlewares");
// const contactsSchema = require("../../schemas");

// const router = express.Router();

// router.get("/", ctrlWrapper(ctrl.listContacts));

// router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

// router.post(
//   "/",
//   validateBody(contactsSchema.addSchema),
//   ctrlWrapper(ctrl.addContact)
// );

// router.put(
//   "/:contactId",
//   validateBody(contactsSchema.addSchema),
//   ctrlWrapper(ctrl.updateById)
// );

// router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

// module.exports = router;
const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

// router.post("/", ctrlWrapper(ctrl.add));
router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
