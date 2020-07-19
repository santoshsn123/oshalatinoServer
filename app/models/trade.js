/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema
 */

const TradeSchema = new Schema({
  tradeTitle: { type: String, default: "" },
  tradeDescription: { type: String, default: "" }
  // hashed_password: { type: String, default: "" },
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

TradeSchema.method({});

/**
 * Statics
 */

TradeSchema.static({});

/**
 * Register
 */

Trade = mongoose.model("Trade", TradeSchema);

module.exports = Trade;
