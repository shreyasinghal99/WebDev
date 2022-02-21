const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");


function requestIssues(url,topicName,repo){

    request(url,cb);


function cb(error,response,html){
    if(error){
        console.log(error);
    }
    if(response.statusCode == 404){
        console.log("Page not found")
    }
    else{
        getIssues(html);
    }
}

function getIssues(html){
    let $ = cheerio.load(html);
    let issueAlllinks = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    
    let arr =[];
    console.log(repo);
    for(let i=0;i<issueAlllinks.length;i++){
        let issueLink = "https://github.com"+$(issueAlllinks[i]).attr("href");
        arr.push(issueLink)
        console.log(issueLink);
    }
    let dirPath = path.join(__dirname,topicName);
    dirCreater(dirPath)
    //for json 👇
    // let filePath = path.join(dirPath,repo+".json");

    //for pdf 👇
    let filePath = path.join(dirPath,repo+".pdf");
    console.log(filePath);
    //to create and write into a pdf
    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();

        //to convert into json file 👇
        //fs.writeFileSync(filePath,text);
}

}
module.exports = {
    giKey : requestIssues
}

function dirCreater(dirPath){
    if(fs.existsSync(dirPath)==false)
    fs.mkdirSync(dirPath);
}