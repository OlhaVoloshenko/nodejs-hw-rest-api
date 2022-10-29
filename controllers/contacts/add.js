// const contacts = require("../../models/contacts");

const ContactModel = require("../../models/ContactsModel");

const add = async (req, res) => {
  const result = await ContactModel.create(req.body);
  res.status(201).json(result);
};

module.exports = add;
