const Cms = require("../models/cms");

exports.createCMS = (req, res) => {
  let cms = new Cms(req.body);
  cms.save();
  return res.send(cms);
};

exports.getAllCMS = (req, res) => {
  Cms.find()
    .sort({  _id: -1  })
    // ._addSpecial("$orderby", { _id: -1 })
    .then(data => {
      return res.send(data);
    });
};

exports.getOneCMS = (req, res) => {
  let id = req.params.id;
  Cms.findOne({ _id: id }).then(data => {
    return res.send(data);
  });
};

exports.updateCMS = (req, res) => {
  let id = req.params.id;
  Cms.updateOne({ _id: id }, req.body).then(data => {
    return res.send(data);
  });
};

exports.deleteCMS = (req, res) => {
  let id = req.params.id;
  Cms.deleteOne({ _id: id })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      res.status(500).jsonp(err);
    });
};
