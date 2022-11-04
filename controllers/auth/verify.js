const { UserModel } = require("../../models");
const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await UserModel.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await UserModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verify;
