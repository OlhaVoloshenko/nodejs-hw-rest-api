const { Schema, model } = require("mongoose");

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const ContactModel = model("Contact", ContactSchema);

module.exports = ContactModel;
