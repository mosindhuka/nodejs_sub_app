const express = require('express');
const app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({secret: "fryrtdfgdrdfsdfg"}));
global.app = app;
app.set('view engine', 'ejs');
//var Cku=require('./middlewares/check_user');
app.use('/post', function(req, res, next) {
    if(req.session.user_id)
    {
      next();
    }
    else
    {
        res.redirect('/');
    }
  
});

var db = require('./db');

require('./routes');

db.connect('mongodb://localhost:27017/test', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
    });
  }
});

