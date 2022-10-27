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
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Contact remove",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
