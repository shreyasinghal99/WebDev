const request = require("request");
const cheerio = require("cheerio");

request ("https://www.espncricinfo.com/series/ipl-2020-21-1210595/sunrisers-hyderabad-vs-mumbai-indians-56th-match-1216495/full-scorecard",cb)
function cb(error, response, html) {
    if (error) {
        console.error(error);
    }
    else {
        extractHtml(html);
    }
}

function extractHtml(html){
    let $ = cheerio.load(html);
    let needed = $(".match-scorecard-page .Collapsible");
    

}