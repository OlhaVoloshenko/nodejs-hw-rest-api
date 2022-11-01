const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const phoneRegexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "User email number required"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      unique: true,
      required: [true, "User phone number required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ContactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().length(13).pattern(phoneRegexp).required(),
  favorite: {
    type: Boolean,
    default: false,
  },
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemasContact = {
  addSchema,
  updateFavoriteSchema,
};

const ContactModel = model("Contact", ContactSchema);

module.exports = {
  ContactModel,
  schemasContact,
};
