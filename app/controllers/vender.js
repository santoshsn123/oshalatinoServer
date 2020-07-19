const Vender = require('../models/vender');
const async = require('async');

exports.createVender = async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.training_data[0]);
  req.body.oshaCardIssueDate = JSON.parse(req.body.oshaCardIssueDate);
  // req.body.oshaCardExpyriDate = JSON.parse(req.body.oshaCardExpyriDate);
  req.body.training_data = JSON.parse(req.body.training_data);
  let ven = await Vender.find({ email: req.body.email });
  if (ven.length) {
    return res.status(400).jsonp({
      status: false,
      message: 'You are already registered with this Email Id'
    });
  }
  ven = await Vender.find({ cell: req.body.cell });
  if (ven.length) {
    return res.status(400).jsonp({
      status: false,
      message: 'You are already registered with this Cell no.'
    });
  }
  const vender = new Vender(req.body);
  await vender.save();
  // for (let i = 0; i < req.body.training_data.length; i++) {
  //   // console.log("########### :- ", req.body.training_data[i].trainingImage);
  //   const imageName = req.body.training_data[i].trainingImage;
  //   // console.log(imageName, req.files[imageName]);
  //   uploadImage(imageName+"_"+vender._id,req.files[imageName]).then(data=>{

  //   })
  // }
  uploadImage("oshaIdImage_" + vender._id, req.files.oshaIdFile).then(image => {
    Vender.updateOne(
      { _id: vender._id },
      {
        oshaCardImage: image
      }
    ).then(done => {
      var i = 0;
      async.eachSeries(
        req.body.training_data,
        (item, callback) => {
          const imageName = item.trainingImage;
          uploadImage(imageName + "_" + vender._id, req.files[imageName]).then(
            img => {
              vender.training_data[i++].trainingImage = img;
              Vender.updateOne(
                { _id: vender._id },
                { training_data: vender.training_data }
              ).then(data => {
                callback(null, "");
              });
            }
          );
        },
        function done() {
          res.send({ status: true });
        }
      );
    });
  });
};

exports.getAllVenders = (req, res) => {
  Vender.find()
    .sort({ _id: -1 })
    .then(data => {
      res.send(data);
    });
};

exports.getOneVender = (req, res) => {
  let id = req.params.id;
  Vender.findOne({ _id: id }).then(data => {
    return res.send(data);
  });
};
exports.deleteOneVender = (req, res) => {
  const id = req.params.id;
  Vender.deleteOne({ _id: id })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      res.status(500).jsonp(err);
    });
};

exports.venderEmailCheck = (req, res) => {
  Vender.findOne({ email: req.body.email }).then(data => {
    return res.send(data);
  });
};

exports.checkIfCellExist = (req, res) => {
  Vender.findOne({ cell: req.body.cell }).then(data => {
    return res.send(data);
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

