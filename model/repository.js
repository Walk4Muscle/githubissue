var Q = require("q"),
    qs = require("querystring"),
    mysqlhelper = require("../helper/dbHelper.js");
    GitResHelper = require("../helper/githubRequestHelper.js");

var searchpath = "/search/repositories";
function Repository(config) {
    var _ = this;
    _.options = {};
    _.structure = [
        "id", "name", "url" ,"full_name", "size", "stargazers_count", "watchers_count", "language", "has_issues", "forks_count", "open_issues_count", "forks", "open_issues", "watchers"
    ];
    for (var key in config) {
        if (config.hasOwnProperty(key)) {
            _.options[key] = config[key];
        }
    }
    if (config['isSearch']) {
        _.reshelper = new GitResHelper({ path: searchpath });
        if (config.hasOwnProperty("search_options")) {
            _.setQueryParam(config["search_options"]);
        }
        // console.log(_.reshelper);
    } else {
        _.reshelper = new GitResHelper({ path: "/orgs/name/repos".replace("name", _.options.name) });
    }

    _.getRepos = function () {
        // if (Object.keys(_.reshelper.pagination).length === 0 ) {
        //     _.reshelper.setSinglePage();
        // }
        // console.log(_.reshelper);
        return _.reshelper.send();
    }

    _.fillData = function () {
        _.data = [];
        _.reshelper.setPageNum(1);
        return _.getRepos().then(function (data) {
            var body = JSON.parse(data.body);
            console.log(body)
            var total = body.total_count;
            _.reshelper.setPageNum(total);
            return _.getRepos().then(function (res) {
                var body = JSON.parse(res.body);
                // console.log(res.body)
                if (_.options.isSearch) {
                    body = body.items;
                }
                // console.log(body)
                // _.data = body;
                body.forEach(function (item) {
                    console.log(item)
                    var tmp = {};
                    tmp["orgs_id"] = item.owner.id;
                    for (var key in item) {
                        // console.log(_.structure.indexOf(key))
                        if (_.structure.indexOf(key) != -1) {
                            tmp[key] = item[key];
                        }
                    }
                    // console.log(tmp)
                    _.data.push(tmp);
                })
                // _.data.forEach(function (item, i) {
                //     _.data[i]["orgs_id"] = item.owner.id;
                // })
                // console.log(_.data);
                return _.data;
            });
        })

    };
};

Repository.prototype.insertToDb = function (data) {
    var db = new mysqlhelper();
    db.insert("repositories", data)
}

Repository.prototype.query = function (option) {
    var db = new mysqlhelper();
    return db.query("repositories", option)
}

Repository.prototype.setQueryParam = function (params) {
    if (params["query"] !== undefined) {
        this.qs = qs.stringify(params["query"], "+", ":");
        this.reshelper.options.path += "?q=" + params["name"] + "+" + this.qs
        this.reshelper.setUrl(searchpath + this.reshelper.options.path);
    }
}

module.exports = Repository;