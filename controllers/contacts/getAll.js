const { ContactModel } = require("../../models");

const getAll = async (_, res) => {
  const result = await ContactModel.find({}, "-createdAt -updatedAt");

  res.json(result);
};

module.exports = getAll;
