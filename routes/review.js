const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const mongoose=require("mongoose");
const controllerReview=require("../controllers/review.js");

//Reviews
//post review route
router.post("/",isLoggedIn,validateReview,wrapAsync(controllerReview.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(controllerReview.deleteReview));

module.exports=router;