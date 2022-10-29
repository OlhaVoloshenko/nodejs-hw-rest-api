const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../middlewares");

const phoneRegexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

const ContactSchema = new Schema(
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
      match: phoneRegexp,
      unique: true,
      // validate: {
      //   validator: function (v) {
      //     return /\d{3}-\d{3}-\d{2}-\d{2}/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
      required: [true, "User phone number required"],
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

const schemas = {
  addSchema,
};
// const User = db.model("user", userSchema);
// const user = new User();
// let error;

// user.phone = '555.0123';
// error = user.validateSync();
// assert.equal(error.errors['phone'].message,
//   '555.0123 is not a valid phone number!');

// user.phone = '';
// error = user.validateSync();
// assert.equal(error.errors['phone'].message,
//   'User phone number required');

// user.phone = '201-555-0123';
// // Validation succeeds! Phone number is defined
// // and fits `DDD-DDD-DDDD`
// error = user.validateSync();
// assert.equal(error, null);
const ContactModel = model("Contact", ContactSchema);

module.exports = {
  ContactModel,
  schemas,
};
