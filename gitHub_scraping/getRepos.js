const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const giObj = require("./getIssues");
//get 8 top repos add then to their respective folder as json files
//let url = "https://github.com/topics/latex";


function requestRepository(url,topicName){
request(url,cb);


function cb(error,response,html){
    if(error){
        console.log("Error");
    }
    if(response.statusCode == 404){
        console.log("Page not found")
    }
    else{
        getRepository(html);
    }
}

function getRepository(html){
    let $ = cheerio.load(html);
    
   
    let repoAllLinks = $("a.text-bold.wb-break-word");
    console.log(topicName);
    for(let i=0;i<8;i++){
        let repoIssueLink = $(repoAllLinks[i]).attr("href");
        
        let repo = repoIssueLink.split("/").pop()
        repoIssueLink = "https://github.com"+$(repoAllLinks[i]).attr("href")+"/issues";
        giObj.giKey(repoIssueLink,topicName,repo);
        console.log(repoIssueLink);
    }
    
    console.log("---------------------");

}
}
module.exports = {
    grKey : requestRepository
}