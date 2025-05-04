const mongoose=require("mongoose");
const express=require("express");
const app=express();
const dotenv=require("dotenv")
dotenv.config();


const dbLink=`mongodb+srv:${process.env.DB_USERNAME}:${process.env.DB_USERNAME}@cluster0.qvdgg3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
.then(function(connection){
    console.log("connected to db")
}).catch(err=>console.log(err));


//******************************start */


const schemaRules={
    name:{
        type:"String",
        required:[true,"name is required"],
    },
    email:{
        type:"String",
        required:true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password should be atleast of 6 length"],
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 6,
        // custom validation
        validate: [function () {
            return this.password == this.confirmPassword;
        }, "password should be equal to confirm password"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        // these are the only possible values for the role
        enum: ["user", "admin", "feed curator", "moderator"],
        default: "user"
    }
}
const userSchema=new mongoose.Schema(schemaRules);

/******hooks in mongodb********/

userSchema.pre("save",function(next){
    console.log("Pre save was called");
    this.confirmPassword = undefined;
    next();
})
userSchema.post("save", function () {
    console.log("post save was called");
    this.__v = undefined;
    this.password = undefined;
})

const UserModel = mongoose.model("User", userSchema);

const createUser=async function(req,res){
    try {
        const userObject=req.body;
        //This retrieves the JSON data sent in the request body (e.g., { name: "Alice", email: "alice@example.com" }).
        //Requires express.json() middleware to work.
        const user=await UserModel.create(userObject);
        //Uses Mongoose's create() method to:
        //Validate the data using the schema.
        // Save the new user document to MongoDB.
        // Returns the created user object.
        res.status(201).json(user);
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: "internal server error",
            error: err,
        })
    }
}
const getAllUser= async function(req,res){
try {
    // In Mongoose, UserModel.find() is used to query the MongoDB database and retrieve documents (records) from a collection.
    const user=await UserModel.find()

      // if user is present -> send the resp
      if (user.length != 0) {
        res.status(200).json({
            message: user
        })
        // if it's not there then send user not found 
    } else {
        res.status(404).json({
            message: "did not get any user"
        })
    }
} catch (error) {
    res.status(500).json({
        status: "Internal server error",
        message: err.message
    })
}
}

const getUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await UserModel.findById(id);
        // This method finds one document by its _id (MongoDB's unique identifier).


         // if user is present -> send the resp
        if(user){
             res.status(200).json({
                message:user
             })
        }
         // if it's not there then send user not found
        else{
            res.status(404).json({
                message: "did not get the user"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}
const deleteUser=async(req,res)=>{
    try {
        let { id } = req.params; //same as let id = req.params.id; 
        // This Mongoose method is used to find a document by its _id and delete it from the MongoDB collection in a single operation.
        const user = await UserModel.findByIdAndDelete(id);
        if (user === null) {
            res.status(404).json({
                status: "sucess",
                message: "user does not exist",

            })
        } else {
            res.status(200).json({
                status: "sucess",
                message: "user is deleted",
                user: user
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}







app.use(express.json());  // middleWare -> user -> object is not empty

app.post("/user", createUser)
app.get("/user", getAllUser);
app.get("/user/:id", getUser);
app.delete("/user/:id", deleteUser);

app.listen(2000, function () {
    console.log("Server started on port 3000")
})