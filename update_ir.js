var mysqlhelper = require("./helper/dbHelper.js");
var GitResHelper = require("./helper/githubRequestHelper.js");


var db = new mysqlhelper();
var sql = "select * from issues where `created_at` between '2015-08-01' and '2016-07-31'";
db.query("issues",{where:"`created_at` between '2015-08-01' and '2016-07-31'"}).then(function(data){
    data.forEach(function(item){
        // console.log(item);
        if(item.comments !=0 ){
            queryComment(item);
        }
    })
})


var reshelper = new GitResHelper({});
function queryComment(issue){
    reshelper.setWholeUrl(issue.comments_url+"?per_page=1");
    // console.log(reshelper)
    //.comments_url+"?per_page=1"
    reshelper.send().then(function(data){
        // data = JSON.stringify(data);
        console.log(data)
        var body = (data.body);
        console.log(body)
        var sql = "UPDATE issues SET init_response_at = '"+body.created_at+"' where id ="+issue.id;
        console.log(sql);
        // db.execute(sql);
        process.exit();
    })
}