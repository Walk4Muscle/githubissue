var mysql = require("mysql");

// var connection = mysql.createConnection(require("../config/database.js"));
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err;

//     console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

function insert(table, object) {
    var sql = "INSERT INTO " + table;
    var sql_columns = " (" + (Object.keys(object).join(",")) + ")";
    var tmp = [];
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            tmp.push("\"" + object[key] + "\"");
        }
    }
    var sql_values = " VALUES (" + tmp.join(",") + ")";
    return sql + sql_columns + sql_values;
}
