const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const { RequestError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await UserModel.findById(id);
      if (!user) {
        throw Error("Unauthorizad");
      }
      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
