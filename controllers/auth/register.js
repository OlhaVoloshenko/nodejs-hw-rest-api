const bcrypt = require("bcryptjs");
const { UserModel } = require("../../models");
const { nanoid } = require("nanoid");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const gravatar = require("gravatar");
// const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await UserModel.create({
    password: hashPassword,
    email,
    avatarURL,
    verificationToken,
  });
  // const mail = {
  //   to: email,
  //   subject: "Verification successful",
  //   html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Натисніть для підтвердження реєстрації</a>`,
  // };
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);
  res.status(201).json({
    // password: result.status,
    email: result.email,
    verificationToken: result.verificationToken,
  });
};

module.exports = register;
