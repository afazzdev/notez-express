const express = require("express");
const cors = require("cors");
const user = require("../features/user");

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.modules();
  }

  middleware() {
    this.app.use(cors());
  }

  modules() {
    this.app.use("/api/user", user);
  }
}

module.exports = new App().app;
