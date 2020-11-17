"use strict";

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require("dotenv").config();

const fs = require("fs");
const join = require("path").join;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 8081;

const app = express();
const connection = connect();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/public/oshalatinoClient/"));
/**
 * Expose dig @161.97.93.202 +nssearch domain.com
 */

module.exports = {
  app,
  connection
};

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf(".js"))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require("./config/passport")(passport);
require("./config/express")(app, passport);
require("./config/routes")(app, passport);

connection
  .on("error", console.log)
  .on("disconnected", connect)
  .once("open", listen);

function listen() {
  if (app.get("env") === "test") return;
  app.listen(port);
  console.log("Express app started on port " + port);
}

function connect() {
  var options = { keepAlive: 1, useNewUrlParser: true };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}


// {"name": "Santosh Narawade", "email": "santosh.narawade1@gmail.com", "hashed_password": "21232f297a57a5a743894a0e4a801fc3", "salt": "21232f297a57a5a743894a0e4a801fc3"}
