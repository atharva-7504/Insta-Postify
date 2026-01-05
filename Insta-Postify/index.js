const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 }= require("uuid");
const methodOverride = require("method-override");
uuidv4();
let port = 3000;

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public/stylesheets")));
app.use(express.static(path.join(__dirname,"public/javascript")));
app.use(express.static(path.join(__dirname,"public/images")));

let posts = [
    {   
        id : uuidv4(),
        username:"atharva_7504",
        content: "Code my way to the fast lane.🚀",
        img:"/atharva.jpg"
    },
    {
        id : uuidv4(),
        username:"pratham_8234",
        content: "Making my own vibe 😎",
        img:"/nikhil.jpg"
    },
    {
        id : uuidv4(),
        username:"nikhil_007",
        content: "Shiny ride, calm mind.🖤",
        img:"/OIP.jpg"
    },
     {
        id : uuidv4(),
        username:"nikhil_007",
        content: "Jai Shri Ganesh 🙏",
        img:"/WhatsApp Image 2024-09-17 at 00.05.25_5ac56583.jpg"
    },
]   


app.get("/posts",(req,res) => {
    res.render("index.ejs",{ posts })
});
app.post("/posts/new",(req,res)=>{
     res.redirect("/posts/new")
})
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{ 
    let {username , content, fileupload } = req.body;
    let img = "/" + fileupload;
    const newPost = {
        id:uuidv4(),
        username:req.body.username,
        content : req.body.content,
        img: img
    }
    posts.push(newPost);
    res.redirect("/posts");

})
app.get("/posts/:id",(req,res)=>{
    
    let id = (req.params.id);
    console.log(id);
    let post = posts.find((p) => p.id === id)
    console.log(post)
    res.render("show.ejs",{ post , id , posts})
    
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post)
    res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post , id})
})
app. delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id)
    res.redirect("/posts/")
})
app.post("/posts/new",(req,res)=>{
    res.redirect("/posts")
})
app.listen(port,()=>{
    console.log("Server is running on port : 3000")
})
