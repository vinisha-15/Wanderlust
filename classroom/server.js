const express=require("express");
const app=express();
const session=require("express-session");

app.listen(3000,()=>{
    console.log("Listening to port 3000");
});
const sessionOptions={
    secret:"mysecret",
    resave:false,
    saveUninitialized:true
};
app.use(session(sessionOptions));
app.get("/register", (req, res, next)=>{
    let {name,roll="102"}=req.query;
    req.session.name=name;
    req.session.roll=roll;
    res.redirect("/hello");
});

app.get("/hello", (req,res)=>{
    res.send(`hello ${req.session.name} with ${req.session.roll}`);
});