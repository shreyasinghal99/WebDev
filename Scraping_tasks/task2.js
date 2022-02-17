let request = require("request")
let cheerio = require("cheerio");
console.log("Before");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
//let request = require("request")
request(url,cb)
function cb (error,response,html) {
  if(error)
    console.error('error:', error); // Print the error if one occurred
  else
    handleHtml(html);
};
console.log("After");
function handleHtml(html){
    let $ = cheerio.load(html);
    let cont =$(".d-flex.match-comment-padder.align-items-center  .match-comment-wrapper .match-comment-long-text");
    let com = $(cont[0]).text();
    let htmlcom = $(cont[0]).html();
    console.log("Latest Commentery :",com);
    console.log("Latest Commentery Html:",htmlcom);
    
}