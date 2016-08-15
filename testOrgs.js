var Organization = require("./model/organization.js");
var mysqlhelper = require("./helper/dbHelper.js"); 
var Repository = require("./model/repository.js");
var GitResHelper = require("./helper/githubRequestHelper.js");

// var AzureADOrg = new Organization("azure-samples");

// var db = new mysqlhelper();
// AzureADOrg.fillData().then(function (data) {
//     db.insert("organizations", data)
// })

var azureADSampleoptions = {
    isSearch:true,
    search_options:{
        name: "active-directory",
        query:{
            in:"name",
            org:"azure-samples"
        }
    }
};
var options = {
    isSearch:false,
    name:"azuread"
}
var AzureADRepos = new Repository(options);
// AzureADRepos.fillData().then(function(data){
//     if(data){
//         AzureADRepos.insertToDb(data);
//     }
// })
var insert_count = 0;
function queryAndInsert(repos){
    repos.fillData().then(function(){
        // console.log(repos.data)
        repos.data.forEach(function(item){
            // console.log(item)
            repos.insertToDb(item)
        })
        // if(data){
        //     repos.insertToDb(data);
        //     insert_count++;
        // }
        // try {
        //     repos.reshelper = repos.reshelper.page("next");
        //     console.log(repos.reshelper.pagination);
        //     queryAndInsert(repos);
        // } catch (error) {
        //     console.log(error);
        //     console.log("inserted :"+insert_count);
        // }
    })
}
queryAndInsert(AzureADRepos);
// var reshelper = new GitResHelper({path:"/search/repositories?q=active-directory+in:name+org:azure-samples"});
// reshelper.setSinglePage();
// reshelper.test();