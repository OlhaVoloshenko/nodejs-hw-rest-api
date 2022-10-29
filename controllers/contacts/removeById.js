const { ContactModel } = require("../../models/ContactsModel");

const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Contact remove",
  });
};

module.exports = removeById;
