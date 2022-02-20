const fs = require("fs");
const xlsx = require("xlsx");
//let content = fs.readFileSync("./example.json");
let data = require("./example.json");
//console.log(data);
// let data = JSON.parse(content);
// console.log(data);
data.push(
    {
        "name":"thor",
        "last Name":"Rogers",
        "isAvenger" :true,
        "friends":[
            "Bruce","natasha","peter"
        ],
        "agr":45,
        "address":{
            "city":"New York",
            "state":"manhattan"
        }
    }
)
//fs.writeFileSync("example.json",JSON.stringify(data));
function excelWriter(json,filePath,SheetName){
    let wb = xlsx.utils.book_new();
    let ws = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(wb,ws,SheetName);
    xlsx.writeFile(wb,filePath);
}

function excelReader(json,filePath,SheetName){
    if(fs.existsSync(filePath)==false)return [];
    let wb = xlsx.readFile(filePath);
    let ws = wb.Sheets[SheetName];
    let cont = xlsx.utils.sheet_to_json(ws);
    return;
}
// wb->file  ws-> new Sheet
//new workBook
//let newWB = xlsx.utils.book_new();

//JSON -> excel
//let newWS = xlsx.utils.json_to_sheet(data);

//move sheet to wb (newWB,newWS,sheetName)
//xlsx.utils.book_append_sheet(newWB,newWS,"Sheet-1");

//
//xlsx.writeFile(newWB,"abc.xlsx")

//read

