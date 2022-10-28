module.exports.ErrorHandler = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
};
