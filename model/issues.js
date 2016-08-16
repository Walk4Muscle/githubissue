var Q = require("q"),
    qs = require("querystring"),
    mysqlhelper = require("../helper/dbHelper.js");
GitResHelper = require("../helper/githubRequestHelper.js");

function Issue(options) {
    var _ = this;
    _.structure = [
        "id", "url", "repository_url", "comments_url", "events_url", "html_url", "number", "title", "state", "comments", "created_at", "updated_at", "closed_at", "body"
    ];
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _.options[key] = options[key];
        }
    }

    _.reshelper = new GitResHelper({ path: "/repos/" + _.options.owner + "/" + _.options.repo_name + "/issues" });
}

Issue.prototype.getRepos = function () {
    return this.reshelper.send();
}

Issue.prototype.insertToDb = function (data) {
    var db = new mysqlhelper();
    db.insert("issues", data)
}

module.exports = Issue;
