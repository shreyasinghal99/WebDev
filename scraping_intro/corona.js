const request = require('request');
const cheerio = require("cheerio")
const chalk = require("chalk")
console.log("Before")
request('https://www.worldometers.info/coronavirus/',cb);

console.log("After")
function cb (error, response,html) {
    if(error)
  console.error('error:', error); // Print the error if one occurred
  else
  handleHtml(html);
};

function handleHtml(html){
let selTool = cheerio.load(html)
//let h1s =selTool("h1")

let contentArr = selTool("#maincounter-wrap span")
// for(let i=0;i<contentArr.length;i++){
//     let data = selTool(contentArr[i]).text()
//     console.log("data",data);
// }
let total = selTool(contentArr[0]).text()
let deaths = selTool(contentArr[1]).text()
let recovered = selTool(contentArr[2]).text()
console.log(chalk.gray("Total Cases "+total))
console.log(chalk.red("Deaths "+deaths))
console.log(chalk.green("Recovered "+recovered))

}
