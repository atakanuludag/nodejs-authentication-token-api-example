var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var secretToken = require('../config').secret;
var router = express.Router();
var user_model = require('../models/user');

router.get('/', emptyFunc);
router.get('/me', meFunc);
router.get('/list', listFunc);
router.post('/create', createFunc);
router.delete('/delete/:id', deleteFunc);
router.patch('/update/:id', updateFunc);

function emptyFunc(req, res) {
      return res.json({error:'Empty Route'});
}

function listFunc(req, res) {
    user_model.find({}, function (err, result) {
      if (err) return res.status(500).send({error:'There was an error while listing.'});
      return res.json(result);
    });
}

function createFunc(req, res) {

  var hashedPassword = passwordHash.generate(req.body.password);
  user_model.create({
      email : req.body.email,
      username : req.body.username,
      password : hashedPassword,
      firstName : req.body.firstName,
      lastName : req.body.lastName
  },
  function (err, result) {
      if (err) return res.status(500).send({error:'There was a problem adding the information to the database.'});
      return res.json(result);
  });

}

function meFunc(req, res) {

  var userId = null;
  var token = req.headers['token'];

  try {
    var decoded = jwt.verify(token, secretToken);
    if (decoded) userId = decoded.userId;
  } catch(err) {
    return res.status(500).send(err);
  }

  if(userId){
    user_model.findById(userId, function (err, result) {
      if (err) return res.status(500).send({error:'Something went wrong.'});
      return res.json(result);
    });
  } else {
    return res.status(500).send({error:'Failed to get user id from token.'});
  }


}

function deleteFunc(req, res){
   var userId = req.params.id;

   if(!userId) return res.status(500).send({error:'User Id Parameter Empty'});

   user_model.deleteOne({_id: userId}, function(err, result) {
      if (err) return res.status(500).send({error:'An error occurred during deleting.'});
      return res.json({success: userId + ' id deleted.'});
    });

}

function updateFunc(req, res){
  var userId = req.params.id;

  if(!userId) return res.status(500).send({error:'User Id Parameter Empty'});

  user_model.update({_id:userId}, {$set:{
    email:req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }}, function(err, result) {
      if (err) return res.status(500).send({error:'An error occurred during the update.'});
      return res.json({success: userId + ' id updated.'});
  });
}

module.exports = router;
