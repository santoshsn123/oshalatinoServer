/*!
 * Module dependencies.
 */
const User = require("../models/user");
const md5 = require("md5");

/*!
 * Module Functions.
 */
// db.users.insertOne({"name" : "Osiris", "email" : "osiris940@gmail.com", "hashed_password" : "5f29e63a3f26798930e5bf218445164f"})
exports.login = (req, res) => {
  console.log("request is inside function",req.body);
  // let user = new User();
  User.find({
    email: req.body.email,
    hashed_password: md5(req.body.password)
  }).then(data => {
    console.log('Logged in ',data)
    // res.send(data);
    if (data.length) {
      res
        .status(200)
        .jsonp({ status: true, messgae: "Login Successfull!!", data: data });
    } else {
      res
        .status(403)
        .jsonp({ status: false, messgae: "Username/Password is wrong!!" });
    }
  });
  // res.send("Login Here ");
};
exports.index = function(req, res) {
  // let user = new User({
  //   name: "santosh",
  //   email: "santosh.narawade1@gmail.com",
  //   hashed_password: md5("santosh")
  // });
  // user.save();
  // res.send(user);

  console.log("Request is here ");
  res.send("Hello Can you see this one ?");
  // res.render("home/index", {
  //   title: "Node Express Mongoose Boilerplate"
  // });
};
