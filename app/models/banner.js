/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema
 */

const BannerSchema = new Schema({
  bannerTitle: { type: String, default: "" },
  bannerImage: { type: String, default: "" }
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

BannerSchema.method({});

/**
 * Statics
 */

BannerSchema.static({});

/**
 * Register
 */

Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
