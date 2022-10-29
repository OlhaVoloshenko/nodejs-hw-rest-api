const { ContactModel } = require("../../models/ContactsModel");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;

  // const result = await ContactModel.findOne({ _id: contactId });
  const result = await ContactModel.findById({ contactId });
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.export = getById;
