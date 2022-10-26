const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../middlewares");

const isbnRegexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const contactSchema = new Schema(
  {
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
      match: isbnRegexp,
      unice: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSaveErrors);

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    // .length(9)
    // .pattern(/^\d{3}-\d{2}-\d{2}$/)
    .required()
    .pattern(isbnRegexp),
  favorite: Joi.boolean(),
});

const schemas = {
  contactsSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
