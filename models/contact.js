const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../middlewares");

// const isbnRegexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const contactSchema = new Schema({
  //   name: {
  //     type: String,
  //     required: [true, "Set name for contact"],
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //   },
  //   phone: {
  //     type: String,
  //     required: true,
  //     match: isbnRegexp,
  //     unice: true,
  //   },
  //   favorite: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  // {
  //   versionKey: false,
  //   timestamps: true,
  // }
  name: {
    type: String,
    // required: [true, "Set name for contact"],
    required: true,
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

contactSchema.post("save", handleSaveErrors);

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactsSchema,
  updateFavoriteSchema,
};

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  schemas,
};
