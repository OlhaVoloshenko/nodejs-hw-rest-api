const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

// const decodeToken = jwt.decode(token);
// // console.log(decodeToken);
// const wrongToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWViYWI1NWMzZDZhMDk3ZDUyNmI3MyIsImlhdCI6MTY2NzE1NDk3OSwiZXhwIjoxNjY3MTU4NTc5fQ.hvgICSs5YLCu8CfdBOO9CPe8tw_YHbvdv3a_FI8ng-Y";

// try {
//   const result1 = jwt.verify(token, SECRET_KEY);
//   console.log(result1);
//   const result2 = jwt.verify(wrongToken, SECRET_KEY);
//   console.log(result2);
// } catch (error) {
//   console.log(error.message);
// }

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.json({
    token,
  });
};

module.exports = login;
