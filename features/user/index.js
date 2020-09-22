const express = require("express");
const userController = require("./user.controller");

class User {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.get("/", userController.test);
  }
}

module.exports = new User().router;
