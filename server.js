var express = require("express");
const path = require('path');
var app = express();
const helmet = require('helmet');
app.use(helmet());

const compression = require('compression');
app.use(compression());

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const morgan = require('morgan');
const rfs = require('rotating-file-stream');

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

var web = require("./web/server");

app.use("/web", web);

const db = require('./web/db');

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
      console.log(app.get('env'));
    });
  }
});