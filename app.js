if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
// console.log(process.env.CLOUD_API_SECRET);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const multer=require('multer');
const upload=multer({dest:'uploads/'})

// const { error } = require("console");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

// app.use((req, res, next) => {
//   res.locals.mapToken = process.env.MAP_TOKEN;
//   next();
// });

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

const sessionOptions={
    secret:"mysecretsupercode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:1000*60*60*24*3,
        httpOnly:true
    },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to db successfully");
})
.catch(err => console.log(err));

app.listen(8080,()=>{
    console.log("Listening to port 8080");
});


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all('*',(req,res,next) => {
 next( new ExpressError(404,"Page not Found!"))
});

app.use((err,req,res,next) => {
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("listings/error.ejs",{message});
});

