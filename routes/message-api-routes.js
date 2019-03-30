// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
//  =============================================================
module.exports = function(app) {
  // Get route for retrieving all of the Messages
    app.get("/", function(req, res) {
      db.Message.findAll({}).then(function(dbMessage) {
          res.render('index',{ messages: dbMessage });
       });
    });

    // GET allows a user to sort messages by score
    app.get("/api/byscore", function(req, res) {
      db.Message.findAll({
        order: [
          ['score', 'DESC']
      ]
      }).then(function(dbscore) {
          res.json(dbscore);
       });
    });
    
     // PUT route for updating Message isTrash to true
    app.put("/api/trash", function(req, res) {
      db.Message.update({
        isTrashed: req.body.isTrashed
    }, {
      where: {
        id: req.body.id
      }
      }).then(function(dbMessage) {
          res.json(dbMessage);
       });
    });

};

