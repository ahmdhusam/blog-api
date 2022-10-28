const { ErrorHandler } = require("../libs/error-handler.lib");

module.exports.suggestionsOptionsMiddleware = (req, res, next) => {
  const { skip = 0, limit = 20 } = req.query;

  req.suggestionsOptions = {
    skip: parseInt(skip),
    limit: Math.min(parseInt(limit), 30),
  };

  if (
    isNaN(req.suggestionsOptions.skip) ||
    req.suggestionsOptions.skip < 0 ||
    isNaN(req.suggestionsOptions.limit) ||
    req.suggestionsOptions.limit < 1
  )
    throw new ErrorHandler("Bad Request", 400);

  next();
};
