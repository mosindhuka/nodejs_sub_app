var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null,
};

module.exports.connect = function(done) {
  if (state.db) return done();

  MongoClient.connect('mongodb+srv://test:test@cluster0-bevxn.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true }, function(err, client) {
    if (err) return done(err);
    state.db = client.db();
    done();
  });
}

module.exports.get = function() {
  return state.db;
}

module.exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
}
