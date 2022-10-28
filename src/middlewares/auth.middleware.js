const { ErrorHandler } = require("../libs/error-handler.lib");
const { User } = require("../models/user.model");

module.exports.authMiddleware = async (req, res, next) => {
  const user = await User.findOne();
  if (!user) return next(new ErrorHandler("Unauthorized", 401));

  req.user = user;
  next();
};
