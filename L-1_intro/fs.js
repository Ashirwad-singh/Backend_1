// koi bhi feature ke liye module require karna padta h
//fs module used to anything that posible with files and folder
const fs=require("fs");
let FileName="file.text";
let Content="hello_W _A";
console.log("-----------");
//file crete karna ka synchronus method--------
// console.log("```: adding content to file");
// fs.writeFileSync(FileName,Content);
// console.log("```: added content to file");

//Asynchronus method------
// console.log("before");
// fs.writeFile(FileName,Content,function(err,data){
//     if(err){
//         console.log("something went wrong");
//     }
//     else{
//         console.log("file written comfortably");
//     }
// })
// console.log("after");

//Read file----
const ContentFile=fs.readFileSync(FileName);
console.log("content:"+ContentFile);

//update file-----
// fs.appendFileSync(FileName,"Appending my data");


// folder-------
// console.log("creating folder:");
// fs.mkdirSync("lec-1");
// console.log("created folder");

//deletion-----
// console.log("removing lec-1");
// fs.rmdirSync("lec-1");
// console.log("removed lec-1");

