var mysql = require("mysql"),
    Q = require("q");
connection = mysql.createConnection(require("../config/database.js"));
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err;

//     console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

function db() {
    this.connection = mysql.createConnection(require("../config/database.js"));
    this.connection.connect();
 };

db.prototype.execute = function (sql) {
    // var connection = mysql.createConnection(require("../config/database.js"));
    // connection.connect();
    return this.connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        console.log("successfully update an item");
        // return rows;
    });
    // connection.end();
    // return data;
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
    // console.log(table)
    // console.log(object)
    // var connection = mysql.createConnection(require("../config/database.js"));
    connection.query('INSERT INTO ' + table + ' SET ?', object, function (err, result) {
        if (err) throw err;
        console.log("successfully insert an item");
        // connection.end();
        // return result;
    });
    // connection.end();
}

db.prototype.query = function (table, option) {
    var deferred = Q.defer();
    var option = option||{};
    // console.log('option '+option)
    // var connection = mysql.createConnection(require("../config/database.js"));
    var sql = 'Select * from ' + table;
    if(option.length !==0 ){
        if(option.where !== undefined){
            sql += ' where ' + option.where;
        }
        if(option.limit !== undefined){
            sql += ' limit ' + option.limit;
        }
        if(option.sql !== undefined){
            sql = option.sql;
        }
    }
    // console.log(sql)
    this.connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log("successfully insert an item");
        // console.log(result)
        // console.log(fields)
        // return result;
        deferred.resolve(result)
    });
    // connection.end();
    return deferred.promise;
}

db.prototype.delete = function(table,id){
    var deferred = Q.defer();
    // var connection = mysql.createConnection(require("../config/database.js"));
    connection.query('delete from ' + table +  'where id = '+id, function (err, result, fields) {
        if (err) throw err;
        deferred.resolve(result)
    });
    // connection.end();
    return deferred.promise;
}

module.exports = db;