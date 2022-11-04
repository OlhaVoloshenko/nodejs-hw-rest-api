const { UserModel } = require("../../models");
const { RequestError, createVerifyEmail, sendEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw RequestError(400, "Missing required field email");
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    message: "Verify email resend",
  });
};

module.exports = resendVerify;
