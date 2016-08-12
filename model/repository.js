var structure = [
    "orgs_id","name","full_name","size","stargazers_count","watchers_count","language","has_issues","forks_count","open_issues_count","forks","open_issues","watchers"
];

var Repository = function(config){
    this.structure = structure;
    for(var key in config) {
        if(config.hasOwnProperty(key)) {
            this[key] = config[key];
        }
    }
};

Repository.prototype.getDataFromGitHub = function(){
    
}

module.exports = Repository;