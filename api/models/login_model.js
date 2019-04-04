const db = require('../../db');
module.exports.login = async function (doc) {
    var results= await db.get().collection('users').find(doc).toArray();
    return results;
}
