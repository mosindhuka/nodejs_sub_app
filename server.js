const express = require('express');
const app = express();
global.app = app;
const session = require('express-session');
const bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({secret: "fryrtdfgdrdfsdfg"}));

app.set('view engine', 'ejs');

const db = require('./db');

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

