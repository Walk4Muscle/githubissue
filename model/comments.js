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
}