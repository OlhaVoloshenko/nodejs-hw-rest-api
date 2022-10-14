const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .length(9)
    .pattern(/^\d{3}-\d{2}-\d{2}$/)
    .required(),
});

module.exports = contactsSchema;
