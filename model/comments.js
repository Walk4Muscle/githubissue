var Q = require("q"),
    qs = require("querystring"),
    mysqlhelper = require("../helper/dbHelper.js");
GitResHelper = require("../helper/githubRequestHelper.js");

function Comments(options){
    var _ = this;
    _.options = {};
    _.structure = [
        "id", "url", "comments_url", "issue_url", "html_url", "created_at", "updated_at", "closed_at", "body"
    ];
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _.options[key] = options[key];
        }
    }
    _.reshelper = new GitResHelper({});
    _.reshelper.setWholeUrl(_.options.url);
    _.getComments = function () {
        return _.reshelper.send();
    };

    _.fillData = function () {
        _.data = [];
        return _.getComments().then(function (res) {
            var body = JSON.parse(res.body);
            if (body) {
                body.forEach(function (item) {
                    // console.log(item)
                    var tmp = {};
                    for (var key in item) {
                        // console.log(key)
                        // console.log(body[i])
                        // console.log(_.structure.indexOf(key))
                        if (item[key] === undefined) {
                            console.log(item)
                            process.exit();
                        }
                        tmp['total_count'] = item.reactions['total_count'] || 0;
                        tmp['vote_up'] = item.reactions['+1'] || 0;
                        tmp['vote_down'] = item.reactions['-1'] || 0;
                        tmp['laugh'] = item.reactions['laugh'] || 0;
                        tmp['hooray'] = item.reactions['hooray'] || 0;
                        tmp['confused'] = item.reactions['confused'] || 0;
                        tmp['heart'] = item.reactions['heart'] || 0;
                        tmp['posi'] = tmp['vote_up']+tmp['laugh']+tmp['hooray']+tmp['heart'];
                        tmp['neg'] = tmp['vote_down']+tmp['confused'];
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
            return _.data;
        });
    };
}
Comments.prototype.deleteAndInsert = function (data) {
    var db = new mysqlhelper();
    // console.log(data)
    db.query("comments", { where: '`id`=' + data.id }).then(function (row) {
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
            db.insert("comments", data)
        }
    })
}
module.exports = Comments;