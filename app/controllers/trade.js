const Trade = require("../models/trade");

exports.createTrade = (req, res) => {
  let trade = new Trade(req.body);
  trade.save();
  return res.send(trade);
};

exports.getAllTrades = (req, res) => {
  Trade.find()
    .sort({ tradeTitle: 1 })
    // ._addSpecial("$orderby", { _id: -1 })
    .then((data) => {
      res.send(data);
    });
};

exports.getOneTrades = (req, res) => {
  let id = req.params.id;
  Trade.findOne({ _id: id }).then((data) => {
    return res.send(data);
  });
};

exports.updateTrades = (req, res) => {
  let id = req.params.id;
  Trade.updateOne({ _id: id }, req.body).then((data) => {
    return res.send(data);
  });
};

exports.deleteTrade = (req, res) => {
  let id = req.params.id;
  Trade.deleteOne({ _id: id })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(500).jsonp(err);
    });
};
