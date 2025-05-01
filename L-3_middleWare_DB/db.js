const mongoose=require("mongoose");
const dotenv = require("dotenv")
dotenv.config();


dbLink=`mongodb+srv:${process.env.DB_USERNAME}:${process.env.DB_USERNAME}@cluster0.qvdgg3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink).then(function (connection){
    console.log("conneced to db")
}).catch(err=>console.log(err))