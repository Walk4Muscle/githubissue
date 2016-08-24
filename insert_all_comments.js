var mysqlhelper = require("./helper/dbHelper.js");
var Comment = require("./model/comments.js");
var Issue = require("./model/issues.js");
var request = require('request');

// console.log(1)
// request({
//         url: 'https://api.github.com/repos/Azure-Samples/active-directory-dotnet-webapp-webapi-openidconnect/issues?status=all',
//         headers:
//         {
//             'User-Agent': 'request',
//             'Authorization': 'token a41069e6f9f097f78340a691fd6f91b4889e1db9'
//         }
//     },function(err,res, data){
//         console.log(err);
//         console.log(res);
//         console.log(data);
//     });
var db = new mysqlhelper();
db.query("issues",{where:"`created_at` between '2015-08-01' and '2016-07-31' and comments != 0"}).then(function(data){
    // console.log(data.length);
    // process.exit();
    data.forEach(function(item){
        // if(item.comments !=0 ){
            queryComment(item);
        // }
    })
})

// var reshelper = new GitResHelper({});
function queryComment(issue){
    // reshelper.setWholeUrl(issue.comments_url);
    var comments = new Comment({url:issue.comments_url});
    queryAndInsert(comments);
}

function queryAndInsert(comments){
  comments.fillData().then(function(){
    //   console.log(issue.data)
      comments.data.forEach(function(item){
            // console.log(item)
            comments.deleteAndInsert(item)
            // process.exit();
        })
    //   console.log(issue.reshelper.pagination)
      if(comments.reshelper.pagination !== undefined){
          comments.reshelper = comments.reshelper.page("next");
          queryAndInsert(comments)
      }
  })
}