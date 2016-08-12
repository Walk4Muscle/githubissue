var request = require("request"),
    Q = require("q");
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
        "User-Agent":"request"
    };
    
    _.pagination = {};

    _.test = function(){
        console.log(_);
    };
    _.addHeader = function(object){
        for(var key in object) {
            if(object.hasOwnProperty(key)) {
                _.options.headers[key] = object[key];
            }
        }
    };
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
    _.send = function(){
        var deferred = Q.defer();
        request(_.options,function(err,data){
            if(err){
                deferred.reject(new Error(err))
            }else{
                console.log(data.headers)
                _.pagination = convertLink(data.headers.link)
                deferred.resolve(data)
            }
        })
        return deferred.promise;
    };
    
    _.addOptions(options);
}

function convertLink(link){
    if(link == undefined){
        return false;
    }else{
        var linkArray = link.split(",");
        var page_obj = {};
        // console.log(linkArray);
        linkArray.forEach(function(item){
            console.log("item "+item)
            var page_rel_arr = item.split(";");
            console.log("page_rel_arr "+page_rel_arr);
            var page_link = page_rel_arr[0].trim().slice(1,-1);
            console.log(page_link);
            var key = page_rel_arr[1].trim().match(/"(.*?)"/);
            console.log(key);
            page_obj[key] = page_link;
        })
        // console.log(page_obj)
        return page_obj;
    }
}

module.exports = GitResHelper;
