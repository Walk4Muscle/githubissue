var mysqlhelper = require("./helper/dbHelper.js");
var GitResHelper = require("./helper/githubRequestHelper.js");


var db = new mysqlhelper();
var sql = "select * from issues where `created_at` between '2015-08-01' and '2016-07-31'";
db.query("issues",{where:"`created_at` between '2015-08-01' and '2016-07-31' and comments != 0 and init_response_at is null"}).then(function(data){
    // console.log(data.length);
    // process.exit();
    data.forEach(function(item){
        // if(item.comments !=0 ){
            queryComment(item);
        // }
    })
})


var reshelper = new GitResHelper({});
function queryComment(issue){
    reshelper.setWholeUrl(issue.comments_url+"?per_page=1");
    // console.log(reshelper)
    //.comments_url+"?per_page=1"
    reshelper.send().then(function(data){
        // data = JSON.stringify(data);
        var body = JSON.parse(data.body);
        // console.log((issue))
        console.log(body)
        var sql = "UPDATE issues SET init_response_at = '"+body[0].created_at+"' where id ="+issue.Id;
        console.log(sql);
        db.execute(sql);
        // process.exit();
    })
}