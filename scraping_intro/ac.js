const { func } = require("assert-plus");
let fs = require("fs");
//Synchronous
// console.log("Before")
// console.log(fs.readFileSync("f2.txt"))
// console.log("After")
//console.log("Meanwhile")


//Asynchronous
console.log("Before")
console.log(fs.readFile("f2.txt",cb))
function cb(err,data){
    console.log("data",data);
}
console.log("After")
console.log("Meanwhile")