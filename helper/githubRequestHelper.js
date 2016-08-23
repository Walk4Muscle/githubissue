var request = require("request"),
    Q = require("q"),
    qs = require("querystring"),
    config = require("../config/request.js");
    baseUri = "https://api.github.com";

// var options = {
//     method:"GET",
//     url:"orgs/azuread/repos?per_page=1",
//     headers:{
//         "User-Agent":"request"
//     }
// }

// request(options,function(err,resp){
//     if(!err){
//         console.log(resp.headers.link);
//     }else{
//         console.error(err);
//     }
// })

var GitResHelper = function(options){
    var _ =this;
    _.options = options || {};
    _.options.method = "GET";
    _.options.url = baseUri;
    _.options.headers = {
        "User-Agent":"request",
        "Authorization":"token "+config.git_token,
        "Accept":"application/vnd.github.squirrel-girl-preview"
    };
    _.pagination = {};

    _.test = function(){
        console.log(_);
    };

    // add custom headers 
    _.addHeader = function(object){
        for(var key in object) {
            if(object.hasOwnProperty(key)) {
                _.options.headers[key] = object[key];
            }
        }
    };

    // add custom options
    _.addOptions = function(object){
        for(var key in object) {
            if(object.hasOwnProperty(key)) {
                _.options[key] = object[key];
            }
        }
        if(object.path !== undefined){
            _.options.url += object.path;
        }
    };

    _.setPageNum = function(num){
        // console.log(_.options.path)
        var path = (_.options.path.split("?"))[0];
        var querystring = (_.options.path.split("?"))[1];
        // console.log(querystring);
        var currentParam = qs.parse(querystring);
        currentParam['per_page'] = num;
        _.options.path = path + "?" + qs.stringify(currentParam);
        // console.log(_.options.path)
        _.setUrl(_.options.path);
    }
    // set request url
    _.setUrl = function(url){
        _.options.url = baseUri + url;
    }
    _.setWholeUrl = function(url){
        _.options.url = url;
    }
    //send http request 
    _.send = function(){
        var deferred = Q.defer();
        // console.log(_);
        request(_.options,function(err,data){
            if(err){
                // console.log(err)
                deferred.reject(new Error(err))
            }else{
                // console.log(data.headers)
                _.pagination = convertLink(data.headers.link)
                deferred.resolve(data)
            }
        })
        return deferred.promise;
    };
    
    _.page = function(target){
        if(target === undefined){
            throw new Error("Haven't give the page target, which should be in the values of (next,last,first,prev)");
        }
        if(!_.pagination.hasOwnProperty(target)){
            throw new Error("The target link "+target+" dose not exist.");
        }else{
            _.options.url = _.pagination[target];
        }
        return _;
    }
    
    _.addOptions(options);
}

function convertLink(link){
    if(link === undefined){
        return {};
    }else{
        var linkArray = link.split(",");
        var page_obj = {};
        linkArray.forEach(function(item){
            // console.log("item "+item)
            var page_rel_arr = item.split(";");
            // console.log("page_rel_arr "+page_rel_arr);
            var page_link = page_rel_arr[0].trim().slice(1,-1);
            // console.log(page_link);
            // var key = page_rel_arr[1].trim().match(/"(.*?)"/);
            var key = page_rel_arr[1].trim().slice(5,-1);
            // console.log(key);
            page_obj[key] = page_link;
        })
        // console.log(page_obj)
        return page_obj;
    }
}

module.exports = GitResHelper;
