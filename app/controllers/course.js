/*!
 * Module dependencies.
 */
const Course = require('../models/course');
const imageBaseName = "courseImage_";
/*!
 * Module Functions.
 */
exports.createCourse = (req, res) => {
  let course = new Course(req.body);
  course.save();
  uploadImage(imageBaseName + course._id, req.files.image).then(image => {
    Course.update({ _id: course._id }, { courseImage: image }).then(done => {
     return res.send(done);
    });
  });
  // return res.send(course);
};
exports.updateCourse = (req, res) => {
  let id = req.params.id;
  Course.update({ _id: id }, req.body).then(data => {
    return res.send(data);
  });
};

exports.getAllCourses = (req, res) => {
  Course.find().sort({ _id: -1 }).then(data => {
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

var uploadImage = (prefix, File) => {
  console.log('File names before Upoload',prefix, File)
  return new Promise((resolve, reject) => {
    let name = File.name;
    let fileName = prefix + "." + name.split(".")[name.split(".").length - 1];
    File.mv("./upload/" + fileName, (error, success) => {
      if (error) {
        reject(error);
      }
      resolve(fileName);
    });
  });
};