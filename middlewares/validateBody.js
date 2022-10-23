const { RequestError } = require("../helpers");

const validateBody = (contactsSchema) => {
  const func = (req, res, next) => {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      next(RequestError(400, "missing required name field"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
