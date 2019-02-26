var db = require('../db');
exports.show = function (cb) {
    db.get().collection('posts').find().toArray(function (err, docs) {
    cb(err, docs);
  });
}

exports.create = function (doc,cb) {
    db.get().collection('posts').insertOne(doc,function (err, id) {
    cb(err, id);
  });
}
