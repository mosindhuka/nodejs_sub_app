const db = require('../db');
module.exports.show = function (cb) {
    db.get().collection('posts').find().toArray(function (err, docs) {
    cb(err, docs);
  });
}

module.exports.view = function (id,cb) {
    db.get().collection('posts').find({_id:id}).toArray(function (err, docs) {
    cb(err, docs);
  });
}

module.exports.create = function (doc,cb) {
    db.get().collection('posts').insertOne(doc,function (err, id) {
    cb(err, id);
  });
}


module.exports.update = function (id,doc,cb) {
    db.get().collection('posts').updateOne({_id:id},{$set:doc},function (err, id) {
    cb(err, id);
  });
}

module.exports.remove = function (id,cb) {
    db.get().collection('posts').deleteOne({_id:id},function (err, id) {
    cb(err, id);
  });
}
