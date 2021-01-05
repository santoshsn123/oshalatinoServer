/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema
 */

const InfoSchema = new Schema({
  // name: { type: String, default: "" },
  email: { type: String, default: "" },
  cell: { type: String, default: "" },
  // salt: { type: String, default: "" }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

InfoSchema.method({});

/**
 * Statics
 */

InfoSchema.static({});

/**
 * Register
 */

const Info = mongoose.model("Info", InfoSchema);

module.exports = Info;
