const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(30).required(),
  subscription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(30).required(),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(30).required(),
});

const schemasUser = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};

const UserModel = model("user", UserSchema);

module.exports = {
  UserModel,
  schemasUser,
};
