const multer=require("multer");
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingcontroller=require("../controllers/listing.js");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

//view all listings+add new listing to the database
router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.createListing));



//deliver form to create new listing
router.get("/new",isLoggedIn,listingcontroller.renderNewForm)

//view details of listing by id
// +update listing details in database
// +delete listing
router.route("/:id")
.get(wrapAsync(listingcontroller.viewDetails))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.updateListingdb))
.delete(isLoggedIn,isOwner,wrapAsync(listingcontroller.deleteListing));

//edit a listing
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontroller.editListing));




module.exports=router;