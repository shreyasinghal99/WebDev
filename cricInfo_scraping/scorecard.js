const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");


function getEachscoreCard(url){
request(url, cb);
}
function cb(error, response, html) {
    if (error) {
        console.error(error);
    }
    else {
        extractMatchDeets(html);
    }
}

function extractMatchDeets(html) {
    
    let $ = cheerio.load(html);
    let descElem = $(".match-header-info.match-info-MATCH .description");
    let result = $(".match-info.match-info-MATCH .status-text");
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    result = result.text();
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    // let htmlString = "";
    for (let i = 0; i < innings.length; i++) {
        // htmlString = $(innings[i]).html();
        // team opponent
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find("h5").text();
        opponentName = opponentName.split("INNINGS")[0].trim();
        let cInning = $(innings[i]);
        console.log(`${venue}| ${date} |${teamName}| ${opponentName} |${result}`);
        let allRows = cInning.find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if (isWorthy == true) {
                // console.log(allCols.text());
                //       Player  runs balls fours sixes sr 
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                //console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
                processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
            }
        }
    }
    console.log("`````````````````````````````````````````````````");
    // console.log(htmlString);
}




function processPlayer(teamName,pname,date,venue,opponent,r,b,fours,sixes,sr,result){
    let teamPath = path.join(__dirname,"ipl",teamName);
    dirCreater(teamPath);
    let filePath = path.join(teamPath,pname+".xlsx");

    let jsonFile = excelReader(filePath,pname);
    if(jsonFile.length==0){
        playerObjKeys = [
            "teamName",
            "pname",
            "date",
            "venue",
            "opponent",
            "runs",
            "balls",
            "4s",
            "6s",
            "sr",
            "result"
        ]
      jsonFile.push(playerObjKeys);
    }
    let playerObj = [
        teamName,
        pname,
        date,
        venue,
        opponent,
        r,
        b,
        fours,
        sixes,
        sr,
        result
    ]
    jsonFile.push(playerObj);
    excelWriter(jsonFile,filePath,pname);
}

function excelReader(filePath,SheetName){
    if(fs.existsSync(filePath)==false)return [];

    let wb = xlsx.readFile(filePath);
    let ws = wb.Sheets[SheetName];
    let cont = xlsx.utils.sheet_to_json(ws);
    
    return cont;
}
function excelWriter(json,filePath,sheetName){
    let wb = xlsx.utils.book_new();
    let ws = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(wb,ws,sheetName);
    xlsx.writeFile(wb,filePath);
}

function dirCreater(dirPath){
    if(fs.existsSync(dirPath)==false){
    fs.mkdirSync(dirPath);
    }
}

module.exports = {
    scoreCardKey  : getEachscoreCard
}