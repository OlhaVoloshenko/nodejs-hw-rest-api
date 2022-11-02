const bcrypt = require("bcryptjs");
const { UserModel } = require("../../models");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await UserModel.create({ password: hashPassword, email });
  res.status(201).json({
    // password: result.status,
    email: result.email,
  });
};

module.exports = register;
