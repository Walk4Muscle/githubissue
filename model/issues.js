var Q = require("q"),
    qs = require("querystring"),
    mysqlhelper = require("../helper/dbHelper.js");
GitResHelper = require("../helper/githubRequestHelper.js");

function Issue(options) {
    var _ = this;
    _.options = {};
    _.structure = [
        "id", "url", "repository_url", "comments_url", "events_url", "html_url", "number", "title", "state", "comments", "created_at", "updated_at", "closed_at", "body"
    ];
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _.options[key] = options[key];
        }
    }
    // console.log(_.options);
    // var path = _.options.path || "/repos/" + _.options.owner + "/" + _.options.repo_name + "/issues";
    _.reshelper = new GitResHelper({});
    _.reshelper.setWholeUrl(_.options.url);
    _.getIssues = function () {
        return _.reshelper.send();
    };
    _.fillData = function () {
        _.data = [];
        return _.getIssues().then(function (res) {
            var body = JSON.parse(res.body);
            // console.log(body)
            if (body) {
                body.forEach(function (item) {
                    // console.log(item)
                    var tmp = {};
                    for (var key in item) {
                        // console.log(key)
                        // console.log(body[i])
                        // console.log(_.structure.indexOf(key))
                        if(item[key]===undefined){
                            console.log(item)
                            process.exit();
                        }
                        if(item.pull_request !== undefined){
                            tmp['is_pull_request'] = true;
                        }
                        // console.log(key +" : "+item[key]);
                        if (_.structure.indexOf(key) != -1) {
                            // console.log(body[i][key]);
                            tmp[key] = item[key];
                            // _.data[i][key] = body[i][key];
                        }
                    }
                    _.data.push(tmp)
                })
            }

            // for(var i in body){
            //     for (var key in body[i]) {
            //     console.log(key)
            //     // console.log(body[i])
            //         // console.log(_.structure.indexOf(key))
            //             console.log(body[i].key);
            //         if (_.structure.indexOf(key) != -1) {
            //             // console.log(body[i][key]);
            //             _.data[i][key] = body[i][key];
            //         }
            //     }
            // }
            return _.data;
        });
    };
}

// Issue.prototype.getIssues = function () {
//     // console.log(this)
//     return this.reshelper.send();
// }

Issue.prototype.insertToDb = function (data) {
    // console.log(data)
    var db = new mysqlhelper();
    db.insert("issues", data)
}

Issue.prototype.deleteFromDb = function (id) {
    var db = new mysqlhelper();
    return db.delete("issues", id);
}

Issue.prototype.deleteAndInsert = function (data) {
    var db = new mysqlhelper();
    // console.log(data)
    db.query("issues", { where: '`id`=' + data.id }).then(function (row) {
        // console.log(row.length)
        if (row.length > 0) {
            console.log("do not need to insert");
            // db.delete("issues", data.id).then(function (row) {
            //     if (row > 0) {
            //          db.insert("issues", data)
            //     }
            // })
        } else {
            console.log(data)
            db.insert("issues", data)
        }
    })
}
module.exports = Issue;
