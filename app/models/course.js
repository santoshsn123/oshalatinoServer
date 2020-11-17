/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  courseName: { type: String, default: '' },
  description: { type: String, default: '' },
  // hashed_password: { type: String, default: "" },
  price: { type: String, default: '' }
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

UserSchema.method({});

/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */

const Course = mongoose.model('Course', UserSchema);

module.exports = Course;
