/*!
 * Module dependencies.
 */
const Course = require('../models/course');
const CourseUser = require('../models/courseUser');
const imageBaseName = "courseImage_";
const fs = require('fs')
/*!
 * Module Functions.
 */
exports.createCourse = (req, res) => {
  let course = new Course(req.body);
  course.save();
  if (req.files) {
    uploadImage(imageBaseName + course._id, req.files.image).then(image => {
      Course.update({ _id: course._id }, { courseImage: image }).then(done => {
        return res.send(done);
      });
    });
  }
  {
    return res.send({ status: true });
  }
  // return res.send(course);
};
exports.updateCourse = (req, res) => {
  let id = req.params.id;
  Course.update({ _id: id }, req.body).then(data => {
    if (req.files) {
      Course.findOne({ _id: id }).then(course => {
        deleteFile(course.courseImage).then(done => {
          uploadImage(imageBaseName + id, req.files ? req.files.image : null).then(image => {
            Course.update({ _id: id }, { courseImage: image }).then(done => {
              return res.send(done);
            });
          });
        });
      });
    }
    else {
      return res.send(data);
    }

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
  Course.findOne({ _id: id }).then(data => {
    deleteFile(data.courseImage).then(data => {
      Course.deleteOne({ _id: id }).then(data => {
        return res.send(data);
      });
    })
  });
};


//CourseUser Functionality here:- 
exports.courseregister = (req,res) =>{
  const user = new CourseUser(req.body);
  user.save();
  return res.send(user);
}

exports.getCourseUsers = (req,res) =>{
  CourseUser.find().sort({_id:-1}).populate('courseId').then(data=>{
    // console.log(data);
    return res.send(data);
  })
}

exports.deleteCourseUser = (req,res) =>{
  CourseUser.deleteOne({_id:req.params.id}).then(data=>{
    return res.send(data);
  })
}

//Extrafunctions 
var deleteFile = fileName => {
  return new Promise((resolve, reject) => {
    if (fileName) {
      fs.unlink(`./upload/${fileName}`, (err) => {
        if (err) {
          console.error('Error in Delete :- ', err)
          resolve(err);
        }
        else {
          resolve('done')
        }
      })
    }
    else {
      resolve('done')
    }
  });
}
var uploadImage = (prefix, File) => {
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