var mysql = require("mysql");
// var connection = mysql.createConnection(require("../config/database.js"));
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err;

//     console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

function db() { };
db.prototype.execute = function (sql) {
    var connection = mysql.createConnection(require("../config/database.js"));
    connetion.connect();
    var data = connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        return rows;
    });
    connection.end();
    return data;
}
db.prototype.insert = function (table, object) {
    // var sql = "INSERT INTO " + table;
    // var sql_columns = " (" + (Object.keys(object).join(",")) + ")";
    // var tmp = [];
    // for (var key in object) {
    //     if (object.hasOwnProperty(key)) {
    //         tmp.push("\"" + object[key] + "\"");
    //     }
    // }
    // var sql_values = " VALUES (" + tmp.join(",") + ")";
    // return this.execute(sql + sql_columns + sql_values);
    var connection = mysql.createConnection(require("../config/database.js"));
    connection.query('INSERT INTO '+table+' SET ?', object, function (err, result) {
        if (err) throw err;
        console.log("successfully insert an item");
        // return result;
    });
    connection.end();
}

module.exports = db;