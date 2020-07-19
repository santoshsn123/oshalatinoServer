const Banner = require("../models/banner");
const imageBaseName = "WebsiteBanne_";
const fs = require("fs");
const path = require("path");

exports.createBanner = (req, res) => {
  const banne = new Banner(req.body);
  banne.save();
  banne._id;

  uploadImage(imageBaseName + banne._id, req.files.image).then(image => {
    Banner.update({ _id: banne._id }, { bannerImage: image }).then(done => {
      res.send(done);
    });
  });
};

exports.getAllBanner = (req, res) => {
  Banner.find()
    .sort({ _id: -1 })
    .then(data => {
      res.send(data);
    });
};

// exports.getOneTrades = (req, res) => {
//   let id = req.params.id;
//   Trade.findOne({ _id: id }).then(data => {
//     return res.send(data);
//   });
// };

// exports.updateTrades = (req, res) => {
//   let id = req.params.id;
//   Trade.update({ _id: id }, req.body).then(data => {
//     return res.send(data);
//   });
// };

exports.deleteBanner = (req, res) => {
  let id = req.params.id;
  // imageBaseName
  Banner.findOne({ _id: id }).then(banner => {
    banner.bannerImage;
    try {
      fs.unlinkSync(path.join(__dirname, "../../upload/" + banner.bannerImage));
    } catch {}

    Banner.deleteOne({ _id: id })
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        res.status(500).jsonp(err);
      });
    // res.send({ message: "deleted" });
  });
};

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
