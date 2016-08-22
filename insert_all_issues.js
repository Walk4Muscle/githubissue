var mysqlhelper = require("./helper/dbHelper.js");
var Repository = require("./model/repository.js");
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

var reposAll = new Repository({});
var repos = [];
reposAll.query().then(function (result) {
    repos = result;
    // return repos;
}).then(function () {
    // console.log(repos)
    repos.forEach(function (item) {
        // console.log(item);
        getIssuesOfRes(item);
        // process.exit()
    });
});

function getIssuesOfRes(reops) {
    // console.log({ url: reops.url + "/issues?state=all" })
    var issueOfRes = new Issue({ url: reops.url + "/issues?state=all&per_page=100" });
    // issueOfRes.fillData().then(function () {
    //     // console.log((reops.url + "/issues?state=all ||||" + issueOfRes.data.length));
    //     // console.log(issueOfRes)
    //     // process.exit()

    // })
    // console.log(issueOfRes)
    queryAndInsert(issueOfRes);
}

function queryAndInsert(issue){
  issue.fillData().then(function(){
    //   console.log(issue.data)
      issue.data.forEach(function(item){
            // console.log(item)
            issue.deleteAndInsert(item)
            // process.exit();
        })
    //   console.log(issue.reshelper.pagination)
      if(issue.reshelper.pagination !== undefined){
          issue.reshelper = issue.reshelper.page("next");
          queryAndInsert(issue)
      }
  })
}