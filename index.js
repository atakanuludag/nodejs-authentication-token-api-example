var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT||5000;
var router = express.Router();
var jwt = require('jsonwebtoken');
var cors = require('cors');
var config = require('./config');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



mongoose.connect(config.connectionString, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.info("### DB Connect ###");
});

router.get('/',function(req,res){
  return res.json({error:'Empty Route'});
});

/* ################################## */
/* ########### Token Check ########## */
router.use(function(req, res, next) {

  var token = req.headers['token'];

  if(!token) return res.status(500).send({error:'Token is empty.'});

  try {
    var decoded = jwt.verify(token, config.secret);
    if (decoded) next();
  } catch(err) {
    return res.status(500).send(err);
  }

});
/* ################################ */

router.use('/user', require('./routes/user'));
app.use('/api', require('./routes/authentication'));
app.use('/api', router);

app.listen(port);

console.log('##### Web Server Run. Port: '+ port +' #####');
