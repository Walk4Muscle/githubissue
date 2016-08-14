var Organization = require("./model/organization.js");
// var mysqlhelper = require("./helper/dbHelper.js"); 
var AzureADOrg = new Organization("AzureAD");

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

AzureADOrg.fillData().then(function (data) {
    console.log(insert("organizations", data))
})