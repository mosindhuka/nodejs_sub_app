const db = require('../db');
module.exports.show = async function () {
    var results= await db.get().collection('posts').find().toArray();
    return results;
}

module.exports.view = async function (id) {
    var results= await db.get().collection('posts').find({_id:id}).toArray();
    return results;
}

module.exports.create = async function (doc) {
    var results= await db.get().collection('posts').insertOne(doc);
    return results;
}


module.exports.update = async function (id,doc) {
    var results= await db.get().collection('posts').updateOne({_id:id},{$set:doc});
    return results;
}

module.exports.remove = async function (id) {
    var results= await db.get().collection('posts').deleteOne({_id:id});
    return results;
}
