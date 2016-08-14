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

var reshelper = new GitResHelper({path:"/orgs/azuread/repos?per_page=1&page=5"});
// reshelper.test();

var length=0;
reshelper.send().then(function(data){
    console.log(data.body);
    // return reshelper.page("next").send();
    
    // reshelper.test();
})
// .then(function(data){
//     reshelper.test();
// });

// function iterateRequest(helper){
//     return helper.send().then(function(data){
//         console.log(data);
//         length++;
//         if(helper.pagination.next !== undefined){
//             console.log(length);
//             return iterateRequest(helper.page("next"));
//         }
//         // return reshelper.page("next").send();
//         // reshelper.test();
//     });
// }

// iterateRequest(reshelper)
// .then(function(data){
//     console.log(data);
//     console.log("length:" + length);
// })