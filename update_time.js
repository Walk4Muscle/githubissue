var mysqlhelper = require("./helper/dbHelper.js");

var db = new mysqlhelper();
// var option = {
//     where: "state = 'closed' and (UNIX_TIMESTAMP(`closed_at`)-UNIX_TIMESTAMP(`created_at`))/(3600*24*3)<=1",
//     limit : '1,10'
// }
// db.query("issues",option).then(function(data){
//     console.log(data);
// })

// update closed in 3 day
var sql = "UPDATE issues SET closed_3_day = 1 WHERE state = 'closed' and (UNIX_TIMESTAMP(`closed_at`)-UNIX_TIMESTAMP(`created_at`))/(3600*24*3)<=1";
var sql = "UPDATE issues SET closed_7_day = 1 WHERE state = 'closed' and (UNIX_TIMESTAMP(`closed_at`)-UNIX_TIMESTAMP(`created_at`))/(3600*24*7)<=1";