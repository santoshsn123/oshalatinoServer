/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema
 */

const VenderSchema = new Schema({
  firstName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  zip: { type: String, default: "" },
  oshaCardNumber: { type: String, default: "" },
  oshaCardIssueDate: { type: Object, default: "" },
  oshaCardExpyriDate: { type: Object, default: "" },
  trade: { type: String, default: "" },
  cell: { type: String, default: "" },
  email: { type: String, default: "" },
  experience: { type: String, default: "" },
  language: { type: String, default: "" },
  training_data: { type: Array, default: "" },
  referenceData: { type: String, default: "" },
  oshaCardImage: { type: String, default: "" }
  // bannerTitle: { type: String, default: "" },
  // bannerImage: { type: String, default: "" }
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

VenderSchema.method({});

/**
 * Statics
 */

VenderSchema.static({});

/**
 * Register
 */

Vender = mongoose.model("Vender", VenderSchema);

module.exports = Vender;
