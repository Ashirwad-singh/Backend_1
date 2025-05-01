const express=require("express");
const app=express();

function beforeFn(req,res,next){
    console.log("before");
    const length=Object.keys(req.body).length;
    if(length>0&&req.body.name&&req.body.userId){
        const fullNameNamArr = req.body.name.split(" ");
        req.body.firstName = fullNameNamArr[0];
        req.body.lastName = fullNameNamArr[1];
        next();
    }else{
        res.status(400).json({
            message: "bad request"
        })
    }
}
function AfterFn(req,res){
    console.log("after fn called");
    console.log("req.body",req.body);
    res.status(200).json({
        message: "response send",
        body: req.body
    })
}
app.use(express.json());




app.post("/posts",beforeFn);

app.post("/posts",AfterFn);


app.use(function (req, res) {
    res.status(404).json({
        message: "404 page not found ",

    })

})


app.listen(3000,function(){
    console.log("server running at port 3000");
})


//app.use -> usecase all method pe chalta h for example:-post,get ,patch,delete 
// inside app.use(no route )-> means all route pe chalega 

//In an Express.js application, req.body is an object that contains data sent by the client in the body of the HTTP request — usually in POST, PUT, or PATCH requests.


// 🧩 But how does req.body get filled?
// To parse the request body, Express needs middleware that can understand the incoming data format:

// For JSON:
// javascript
// Copy
// Edit
//*********app.use(express.json()); */ 