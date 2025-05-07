const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());

app.get("/",(req,res)=>{
    console.log("get request is saved");
      // res -> cookie
    // server client ko bhej ra hai 
    res.cookie("prevpage","home",{maxAge:1000*60*60*24,})
     // res is send
     res.status(200).json({
        message:"recevied request on home page"
     })

})

app.get("/product",function (req,res){
    let messageStr="";
    if(req.cookies&&req.cookies.prevpage){
      messageStr=`you visited ${req.cookies.prevpage} page before`

    }
    else{
      messageStr="no previous page found"
    }
    res.status(200).json({
      message: messageStr
  })
})
app.get("/clearCookies",function(req,res){
    // clearing the cookie -> name of the cookie , path where it was created 
    res.clearCookie('prevpage',{path:"/"});
    res.status(200).json({
      message: "i have cleared your cookie"
  })
})

//server run on port 4000
app.listen(4000,function(){
    console.log("server is running on port no 4000")
})