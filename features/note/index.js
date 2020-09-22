const express = require('express');

class Note {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {}
}

module.exports = new Note().router;
