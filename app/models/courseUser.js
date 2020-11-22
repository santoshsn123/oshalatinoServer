/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, //{ type: String, default: "" }
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

const CourseUser = mongoose.model("courseUser", UserSchema);

module.exports = CourseUser;
