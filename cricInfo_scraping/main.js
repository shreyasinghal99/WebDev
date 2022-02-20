const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
let getAllObj = require("./allMatch");

let ipldirPath = path.join(__dirname,"ipl");

dirCreater(ipldirPath);

function dirCreater(filePath){
    if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
    }
}

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.error(error);
    }
    else {
        extractHtml(html);
    }
}

function extractHtml(html) {

    let $ = cheerio.load(html);
    let resLink = $(".widget-items.cta-link a").attr("href");   //$(" a[data-hover='View All Results']").attr("href");
    //console.log(resLink);
    resLink = "https://www.espncricinfo.com" + resLink;
    getAllObj.getAllKey(resLink);
    
}


    



