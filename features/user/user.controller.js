const userServices = require("./user.service");

class UserController {
  test(req, res, next) {
    res.send("Good");
  }
}

module.exports = new UserController();
