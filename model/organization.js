var Q = require("q"),
    GitResHelper = require("../helper/githubRequestHelper.js");
// var structure = [
//     "id", "name", "login", "created_at", "updated_at", "public_repos", "public_gists", "description"
// ];
// var reshelper = new GitResHelper({path:"/orgs/azuread"});

var Organization = function (name) {
    var _ = this;
    _.structure = [
        "id", "name", "login", "created_at", "updated_at", "public_repos", "public_gists", "description"
    ];
    // for(var key in config) {
    //     if(config.hasOwnProperty(key)) {
    //         this[key] = config[key];
    //     }
    // }
    _.name = name;
    _.reshelper = new GitResHelper({ path: "/orgs/name".replace("name", _.name) });
    _.getOrg = function () {
        return _.reshelper.send();
    };
    _.fillData = function () {
        _.data = {};
        return _.getOrg().then(function (res) {
            var body = JSON.parse(res.body);
            // console.log(body)
            for (var key in body) {
                // console.log(_.structure.indexOf(key))
                if (_.structure.indexOf(key) != -1) {
                    _.data[key] = body[key];
                }
            }
            return _.data;
        });
    };
    _.insertToDb = function(){
        if(_.data !== {} &&_.data !== undefined){
            
        }
    }
};

module.exports = Organization;