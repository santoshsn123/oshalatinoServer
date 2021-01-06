/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Cms schema
 */

const CmsSchema = new Schema({
  // name: { type: String, default: "" },
  // email: { type: String, default: "" },
  // hashed_password: { type: String, default: "" },
  // salt: { type: String, default: "" }
  pageTitle_en: { type: String, default: "" },
  pageTitle_es: { type: String, default: "" },
  content_en: { type: String, default: "" },
  content_es: { type: String, default: "" }
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

CmsSchema.method({});

/**
 * Statics
 */

CmsSchema.static({});

/**
 * Register
 */

Cms = mongoose.model("CMS", CmsSchema);

module.exports = Cms;
