var mysql = require('mysql');
var util = require('util');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mosin',
    database : 'mosin'
});

connection.connect(function(err) {
    if (err) throw err;
});

connection.query=util.promisify(connection.query);

module.exports = connection;