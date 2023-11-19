const ApplicationError = require("./ApplicationError");

class EmailAlreadyTakenError extends ApplicationError {
  constructor() {
    super("Email Already Taken");
  }
}

module.exports = EmailAlreadyTakenError;