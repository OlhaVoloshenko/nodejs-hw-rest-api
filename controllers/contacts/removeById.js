const { ContactModal } = require("../../models/ContactsModel");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModal.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Contact remove",
  });
};

module.exports = removeById;
