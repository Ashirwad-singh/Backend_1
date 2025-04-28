const express=require("express");
const fs=require("fs");
const app=express();
console.log("before");
const content=fs.readFileSync("posts.json","utf-8");
const jsonPosts=JSON.parse(content);

function getAllPostsHandler(req,res){
    try{
        console.log("Recieved get request");
     res.status(200).json(jsonPosts);
    }
    catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }
}
function getPostById(req,res){
    try {
        const postid=req.params.postId;
        console.log("postId",postid);
        const postsArr=jsonPosts.posts
        for(let i=0;i<postsArr.length;i++){
              if(postsArr[i].id==postid){
                return res.status(200).json({ post: postsArr[i]})
              }
        }
        res.status(404).json({
            post: "post not found"
        })
    } catch (error) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
function createPost(req,res){
    try {
        const postsArr=jsonPosts.posts;
        postsArr.push(req.body);
        res.status(201).json({
            message: "post created "
        })
    } catch (error) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
function deletePost(req,res){
    try {
        const postid=req.params.postId;
        const postsArr=jsonPosts.posts
        const postIndex = postsArr.findIndex(post => post.id === postid);

        if (postIndex !== -1) {
            postsArr.splice(postIndex, 1);
            return res.status(200).json({
                message: "Post deleted successfully"
            });
        } else {
            return res.status(404).json({
                message: "Post not found"
            });
        }

    } catch (error) {
        res.status(500).json({
            response: "something went wrong on our end"
        })
    }
}
function updatePost(req, res) {
    try {
        const postid = req.params.postId;
        const postsArr = jsonPosts.posts;

        const postIndex = postsArr.findIndex(post => post.id === postid);

        if (postIndex !== -1) {
            // Update the found post with new data from req.body
            const updatedData = req.body;
            postsArr[postIndex] = { ...postsArr[postIndex], ...updatedData };

            return res.status(200).json({
                message: "Post updated successfully",
                post: postsArr[postIndex]
            });
        } else {
            return res.status(404).json({
                message: "Post not found"
            });
        }

    } catch (error) {
        res.status(500).json({
            response: "Something went wrong on our end"
        });
    }
}





app.use(express.json());

//++++++get all post ++++++++
app.get("/posts",getAllPostsHandler)
//++++++++++ get a post++++++++
// app.get("/posts/:postId",getPostById)

app.post('/posts',createPost)

app.delete('/posts/:postId',deletePost)

app.patch("/posts",updatePost);


//++++++server start+++++++++++
app.listen(1000,function(){
    console.log("server is running in port 3000")
})