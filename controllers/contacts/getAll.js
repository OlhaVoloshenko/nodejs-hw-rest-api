const { ContactModel } = require("../../models/ContactsModel");

const getAll = async (_, res) => {
  const result = await ContactModel.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAll;
