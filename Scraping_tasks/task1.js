let request = require("request")
let cheerio = require("cheerio");
console.log("Before");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
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
    let cont =$(".playerofthematch-player-detail .playerofthematch-name");
    let player = $(cont[0]).text();
    console.log("Player Of the Match 🙌 :",player);
    
    
}