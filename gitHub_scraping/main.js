const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const grObj = require("./getRepos")

const url = "https://github.com/topics";

request(url,cb);

function cb(error,response,html){
    if(error){
        console.log("Error");
    }
    if(response.statusCode == 404){
        console.log("Page not found")
    }
    else{
        handleHtml(html);
    }
}

//extract topics 

function handleHtml(html){
    let $ = cheerio.load(html);
    let topics = $(".no-underline.d-flex.flex-column.flex-justify-center");
    let topicsNames = $(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1")
    for(let i=0;i<3;i++){
    let topicLink = "https://github.com/"+$(topics[i]).attr("href");
    let topicName = $(topicsNames[i]).text().trim();
    topicName = topicName;
    grObj.grKey(topicLink,topicName);
    
    
    }
    
}