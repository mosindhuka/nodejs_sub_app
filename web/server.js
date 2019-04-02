const express = require('express');
const app = express();
global.app = app;
const path = require('path');
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
//app.set('BASEURL', 'http://localhost:3000/web/');
app.locals.BASEURL = 'http://localhost:3000/web/';
const session = require('express-session');
//app.use(express.static('assets'));
app.use(express.static(path.join(__dirname, 'assets')));

const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
app.use(session({secret: "fryrtdfgdrdfsdfg",resave: false,store: new MongoStore({ url: 'mongodb://localhost:27017/test' })}));
app.use(flash());

require('./routes');

module.exports = app;