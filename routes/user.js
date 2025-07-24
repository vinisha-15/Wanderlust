express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {savedRedirectUrl}=require("../middleware.js");
const controllerUser=require("../controllers/user.js");

router.route("/signup")
.get(controllerUser.signupForm)
.post(wrapAsync(controllerUser.signup));

router.route("/login")
.get(wrapAsync(controllerUser.loginForm))
.post(savedRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),controllerUser.login);

router.get("/logout",controllerUser.logout)
module.exports=router;