const express = require('express');
const app = express();
global.app = app;
const compression = require('compression');
app.use(compression());
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(morgan('combined'));
app.use(session({secret: "fryrtdfgdrdfsdfg",store: new MongoStore({ url: 'mongodb://localhost:27017/test' })}));
app.use(flash());
app.set('view engine', 'ejs');

const db = require('./db');
const db2 = require('./db2');

require('./routes');

db.connect('mongodb://localhost:27017/test', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    db2.connect(function(err) {
      if(err) {
          console.log('Unable to connect to MySql.');
          process.exit(1);
      }else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
      console.log(app.get('env'));
    });
    }
    });
  }
});

