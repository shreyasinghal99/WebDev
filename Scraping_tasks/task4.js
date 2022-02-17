const request = require("request")
const cheerio = require("cheerio");
const { html } = require("cheerio/lib/api/manipulation");
console.log("Before");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
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
    
//print the table
    let tableArr = $(".match-scorecard-table >.Collapsible");
    
    for(let i=0;i<tableArr.length;i++){
        // let currentHtml = $(tableArr[i]).html();
        // htmlStr += currentHtml;
        let teamNameElem = $(tableArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        
        let table = $(tableArr[i]).find(".table.batsman tbody");
        let allBatsmen = $(table).find("tr");
        for(let j=0;j<allBatsmen.length;j++){
        let playerDeets = $(allBatsmen[j]).find("td");
        let hasClass = $(playerDeets[0]).hasClass("batsman-cell");
        if(hasClass){
            let playerName = $(playerDeets[0]).text();
            let playerLink = "https://www.espncricinfo.com"+ $(playerDeets[0]).find("a").attr("href");
            //console.log(playerLink);
             getBirthday(playerLink,teamName,playerName);
            //console.log(`teamName ${teamName} playerName ${playerName}`);
        }
        
        
        
        
        
        }
        //console.log(`highest wicket ${hwt} taken by ${hwtPlayer} from Winning Team ${winningName}`);
    }
    
}

function getBirthday(url,teamName,playerName){
   request(url,cb);
   function cb(error,response,html){
    if(error)
    console.error('error:', error); // Print the error if one occurred
  else
  ExtractBirthday(html,teamName,playerName)
    
  };}

function ExtractBirthday(html,teamName,playerName){
    let $ = cheerio.load(html);
    let details = $(".player-card-description")
    let bday = $(details[1]).text();
    console.log(`${playerName} plays for ${teamName} was born on ${bday}` );

}

