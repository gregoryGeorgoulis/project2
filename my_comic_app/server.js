//requirements
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var ejs = require('ejs');
var md5 = require('md5');
var request = require('request');
var db = process.env.MONGODB_URI || "mongodb://localhost/marvel_app";
var port = process.env.PORT || 3000;
require('events').EventEmitter.prototype_maxlistener = 0;


//middleware 
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


//database
mongoose.connect(db);

//controllers 
var userController = require('./controllers/controller.js');
app.use('/users', userController);


//listener
app.listen(port);
console.log('+++++++++++++++++++++++');
console.log('running on port ' + port);
console.log('+++++++++++++++++++++++');




