const ApiError = require("../utils/ApiError");

const validate = (validatorFn) => (req, res, next) => {
  const errors = validatorFn(req.body) || [];
  if (errors.length > 0) throw new ApiError(400, "Validation failed", errors);
  next();
};

module.exports = validate;