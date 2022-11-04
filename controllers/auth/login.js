const bcrypt = require("bcryptjs");
const { UserModel } = require("../../models");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw RequestError(401, "user is wrong");
  }
  if (!user.verify) {
    throw RequestError(401, "Email not verify");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await UserModel.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

module.exports = login;
