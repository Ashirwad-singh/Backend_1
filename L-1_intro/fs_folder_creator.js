// const fs=require("fs");

// const lectureNames = ["intro to backend dev with Nodejs", "Intro to Express and postman",
//     "Mongodb and mongoose", "MVC architecture and REST API", "Data validation and hooks in mongoose"
// ]
// for(let i=0;i<lectureNames.length;i++){
//     //folder name
//     let curreFolderName=`lecture-${i+1}-${lectureNames[i]}`;
//     fs.mkdirSync(curreFolderName);
//     //writeFileSync
//     let filePath=`${curreFolderName}/readme.md`;
//     fs.writeFileSync(filePath,"# Agenda");
//     console.log("createdfolder",curreFolderName);
// }