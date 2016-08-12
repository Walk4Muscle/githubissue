var Repository = require("./model/repository.js");

var repository = new Repository({
    orgs:"AzureAD"
})

// console.log(repository);

// var request = require("request");
// request({
//     method:"GET",
//     url:"https://api.github.com/organizations/2966316/repos?per_page=1",
//     headers:{
//         "User-Agent":"request"
//     }
// }).then(function(data){
//     console.log(data);
// })

var GitResHelper = require("./helper/githubRequestHelper.js");

var reshelper = new GitResHelper({path:"/orgs/azuread/repos?per_page=1"});
reshelper.send().then(function(data){
    // reshelper.test();
    console.log("data")
})