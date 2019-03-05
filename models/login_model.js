const db = require('../db');
module.exports.login = function (doc,cb) {
    db.get().collection('users').find(doc).toArray(function (err, docs) {
    cb(err, docs);
  });
}
