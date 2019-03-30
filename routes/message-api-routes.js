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

      // Get route for retrieving all of the Messages
      app.get("/content", function(req, res) {
        db.Message.findAll({}).then(function(dbMessage) {
          
          //modify content 
          // creqte new obj
          // send new obj to hqndlebqrs

          res.render('index',{ messages: dbMessage });
         });
      });


    // GET allows a user to sort messages by score
    app.get("/api/byscore", function(req, res) {
      db.Message.findAll({
        order: [
          ['score', 'ASC']
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

    // PUT route for updating isStarred to true
    app.put("/api/star", function(req, res) {
      db.Message.update({
        isStarred: req.body.isStarred
      }, {
        where: {
          id: req.body.id
        }
        }).then(function(dbMessage) {
            res.json(dbMessage);
          });
      });
};

