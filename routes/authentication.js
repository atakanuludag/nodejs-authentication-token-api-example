var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var secretToken = require('../config').secret;
var user_model = require('../models/user');
var passwordHash = require('password-hash');

router.post('/authentication', function(req, res){


  if(!req.body.username && !req.body.password){
    return res.json({error:'Username and Password is empty.'});
  }

  user_model.findOne({username: req.body.username}, function (err, result) {

      if (err) return res.status(500).send("There was a problem finding the users.");

      if(!result) return res.json({error:'Username is incorrect.'});
      
      var verify = passwordHash.verify(req.body.password, result.password);

      if(!verify){
          return res.json({error:'Password is incorrect.'});
      }

      var token = jwt.sign({userId: result.id},  secretToken);
      return res.json({Token: token, userId: result.id});
  });

});

module.exports = router;
