const express = require('express');
const app = express();
global.app = app;
app.set('view engine', 'ejs');
const path = require('path');
const compression = require('compression');
app.use(compression());
const session = require('express-session');
const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('assets'));

const multer = require('multer');
//app.use(multer({ dest: path.join(__dirname,'assets/uploads/') }).any());

const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
app.use(session({secret: "fryrtdfgdrdfsdfg",resave: false,store: new MongoStore({ url: 'mongodb://localhost:27017/test' })}));
app.use(flash());


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

const db = require('./db');

require('./routes');

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
