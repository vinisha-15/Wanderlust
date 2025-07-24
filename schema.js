


// const Joi=require("joi");
// module.exports.listingSchema=Joi.object({
//   listing:Joi.object({
//     title: Joi.string().required(),
//     description:Joi.string().required(),
//     location:Joi.string().required(),
//     country:Joi.string().required(),
//     price:Joi.number().required().min(0),
//     description:Joi.string().allow("",null),
// }).required(),
// });
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("", null), // Optional, can be empty or null
    image: Joi.object({
      url: Joi.string().uri().allow(""),
      filename: Joi.string().allow(""),
    }).default({ url: "", filename: "" }), // Matches image: { url, filename }
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});




module.exports.reviewSchema=Joi.object({
  review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
  }).required()
})