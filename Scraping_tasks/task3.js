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
    let teamsArr =$(".match-info.match-info-MATCH .team");
    let winningName ;
    for(let i=0;i<teamsArr.length;i++){
        let hasGrey = $(teamsArr[i]).hasClass("team-gray");
        if(hasGrey==false){
            let teamName = $(teamsArr[i]).find(".name");
            winningName = teamName.text();
            
        }
    }
//print the table
    let tableArr = $(".match-scorecard-table >.Collapsible");
    let htmlStr = "";
    for(let i=0;i<tableArr.length;i++){
        // let currentHtml = $(tableArr[i]).html();
        // htmlStr += currentHtml;
        let teamNameElem = $(tableArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        if(winningName == teamName){
        console.log(teamName);
        let table = $(tableArr[i]).find(".table.bowler");
        let allBowlers = $(table).find("tr");
        
        let hwtPlayer;
        let hwt = 0;
        for(let j=0;j<allBowlers.length;j++){
        let playerDeets = $(allBowlers[j]).find("td");
        let playerName = $(playerDeets[0]).text();
        let wicket = $(playerDeets[4]).text();
        console.log(`Winning Team ${winningName} playerName ${playerName} wicket ${wicket}`);
        if(wicket>=hwt){
         hwt = wicket;
         hwtPlayer = playerName
        }
        }
        console.log(`highest wicket ${hwt} taken by ${hwtPlayer} from Winning Team ${winningName}`);
    }
    
}
}
