var mongoose = require('mongoose');
var User = require('./model.js');

module.exports = function(app) {

  app.get('/users', function(req, res) {
    var query = User.find({});
    query.exec(function(err, users){
      if (err) {
        res.send(err);
      } else {

      res.json(users);
      }
    });
  });

  app.post('/users', function(req, res){
    var newuser = new User(req.body);

    newuser.save(function(err) {
      if (err)
        res.send(err);
      else

        res.json(req.body);
    });
  });
  app.post('/query/', function(req, res){
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance = req.body.distance;

    var query = User.find({});

    if(distance){
      query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]}

      maxDistance: distance * 1609.34, spherical: true});

    }
    query.exec(function(err, users){
        if(err)
            res.send(err);

            res.json(users);
    });
});



};
