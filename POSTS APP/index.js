const express = require("express");
const axios = require("axios");
const path = require("path");
const { v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");
uuidv4();
const port = 3000;
const app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
let posts = [
  {
    "id": uuidv4(),
    "name": "Aarav Sharma",
    "headline": "Software Engineer | MERN Stack",
    "company": "Infosys",
    "content": "Excited to share that I’ve started working on a Complaint Management System using Express and REST APIs 🚀",
    "createdAt": "2026-01-04T09:30:00",
  },
  {
    "id": uuidv4(),
    "name": "Priya Mehta",
    "headline": "Final Year CS Student",
    "company": "VIT",
    "content": "Just completed my first REST API project! Feeling more confident with backend development 💻✨",
    "createdAt": "2026-01-03T18:10:00",
  },
  {
    "id": uuidv4(),
    "name": "Rohit Verma",
    "headline": "Full Stack Developer",
    "company": "TCS",
    "content": "Tip for beginners: Always structure your Express projects properly. Clean code saves hours later 🔧",
    "createdAt": "2026-01-02T14:45:00",
  },
  {
    "id": uuidv4(),
    "name": "Sneha Kulkarni",
    "headline": "Data Analyst",
    "company": "Accenture",
    "content": "Learning SQL and Python side by side has improved my analytical thinking drastically 📊🐍",
    "createdAt": "2026-01-01T11:20:00",
  },
  {
    "id": uuidv4(),
    "name": "Kunal Patel",
    "headline": "DevOps Engineer",
    "company": "Wipro",
    "content": "Automated my deployment pipeline using GitHub Actions today. Small wins matter 🔁🔥",
    "createdAt": "2025-12-31T20:05:00",
  }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("create.ejs");
})
app.post("/posts",(req,res)=>{
    let { name,headline,company,content} = req.body;
    let newPost = {
        id:uuidv4(),
        name:name,
        headline:headline,
        company:company,
        content:content,
        createdAt: new Date(),
    }
    posts.push(newPost);
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let id = req.params.id;
    let post = posts.find((p) => p.id == id);
    res.render("post.ejs",{post});
})
app.get("/posts/:id/edit",(req,res)=>{
    let id = req.params.id;
    let post = posts.find((p)=>p.id == id);
    res.render("edit.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let id = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id == id);
    post.content = newContent;
    res.render(`index.ejs`,{posts});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id !== id);
    res.redirect("/posts")

})

app.listen(port,()=>{
    console.log("✅ Server Running on port : 3000");
})