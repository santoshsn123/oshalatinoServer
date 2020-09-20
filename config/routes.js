"use strict";
const path = require("path");
const express = require("express");
/**
 * Module dependencies.
 */

const home = require("../app/controllers/home");
const trade = require("../app/controllers/trade");
const banner = require("../app/controllers/banner");
const vender = require("../app/controllers/vender");

/**
 * Expose
 */

module.exports = function(app) {
  app.get("/uploaded-image/:id", (req, res) => {
    let name = req.params.id; //req.param;
    console.log('File uploading :- ',name);
    // console.log("Data :- ", name, path.join(__dirname, "../upload/" + name));
    res.sendFile(path.join(__dirname, "../upload/" + name));
  });

  app.get("/api/v1/admin/login", home.index);

  /*Admin Login Here */
  // app.post("/login", home.login);

  app.post("/api/v1/admin/login", home.login);

  /**Trade API Here*/
  app.post("/api/v1/trade", trade.createTrade);
  app.get("/api/v1/trade", trade.getAllTrades);
  app.get("/api/v1/trade/:id", trade.getOneTrades);
  app.put("/api/v1/trade/:id", trade.updateTrades);
  app.delete("/api/v1/trade/:id", trade.deleteTrade);
  /**Trade API Done Here*/

  /**Banner API Here*/
  app.post("/api/v1/banner", banner.createBanner);
  app.get("/api/v1/banner", banner.getAllBanner);
  app.delete("/api/v1/banner/:id", banner.deleteBanner);

  /**Vender API Here*/
  app.post("/api/v1/vender", vender.createVender);
  app.get("/api/v1/vender", vender.getAllVenders);
  app.get("/api/v1/vender/:id", vender.getOneVender);
  app.delete("/api/v1/vender/:id", vender.deleteOneVender);
  app.post('/api/v1/venderemailcheck', vender.venderEmailCheck);
  app.post('/api/v1/checkifcellexist', vender.checkIfCellExist);

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf("not found") ||
        ~err.message.indexOf("Cast to ObjectId failed"))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render("500", { error: err.stack });
  });

  // app.get('/', (req,res) => {
  //   res.sendFile(process.cwd()+"/public/oshalatinoClient/")
  // });
  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.sendFile(process.cwd()+"/public/oshalatinoClient/")
    // res.status(404).render("404", {
    //   url: req.originalUrl,
    //   error: "Not found"
    // });
  });
};
