/*!
 * Module dependencies.
 */
const Course = require('../models/course');

/*!
 * Module Functions.
 */
exports.createCourse = (req, res) => {
  let course = new Course(req.body);
  course.save();
  return res.send(course);
};
exports.updateCourse = (req, res) => {
  let id = req.params.id;
  Course.update({ _id: id }, req.body).then(data => {
    return res.send(data);
  });
};

exports.getAllCourses = (req, res) => {
  Course.find().then(data => {
    return res.send(data);
  });
};

exports.getCourseById = (req, res) => {
  let id = req.params.id;
  Course.findOne({ _id: id }).then(data => {
    return res.send(data);
  });
};

exports.deleteCourse = (req, res) => {
  let id = req.params.id;
  Course.deleteOne({ _id: id }).then(data => {
    return res.send(data);
  });
};
