var mysql = require('mysql');

var state = {
  db: null,
};

module.exports.connect = function(done) {
  if (state.db) return done();

  state.db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mosin',
    database : 'mosin'
  });
  state.db.connect(function(err) {
    if (err) return done(err);
    done();
  });
  
}

module.exports.get = function() {
  return state.db;
}

module.exports.close = function(done) {
  if (state.db) {
    state.db.end(function(err) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
}
