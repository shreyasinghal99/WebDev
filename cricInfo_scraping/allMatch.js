const request = require("request");
const cheerio = require("cheerio");
let eachScore = require("./scorecard")

function getAllMatches(link) {
    request(link, cb);
}
    function cb(error, response, html) {
        if (error) {
            console.error(error);
        }
        else {
            extractAllMatchesSBlink(html);
        }
    }


function extractAllMatchesSBlink(html) {
    let $ = cheerio.load(html);
    let scorecardElems = $("a[data-hover='Scorecard']");
    for(let i = 0;i<scorecardElems.length;i++){
       let link =  "https://www.espncricinfo.com"+$(scorecardElems[i]).attr("href");
       console.log(link);
       eachScore.scoreCardKey(link);
    }
}

module.exports = {
    getAllKey : getAllMatches
}