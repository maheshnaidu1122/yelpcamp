 const express=require('express')
 const router=express.Router({mergeParams:true})
 const methodOverride = require('method-override'); 
 const Review = require('../models/reviews');
 const CampGround = require('../models/campground');
 const {IsLoggedIn,IsReviewAuthor}=require('../middleware')
 router.delete('/:reviewid',IsLoggedIn, IsReviewAuthor,async (req, res) => {
    const { id,reviewid } = req.params;
    const campground = await CampGround.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});

    if (!campground) {
      return res.status(404).send("Campground not found");
    }
    res.redirect(`/campground/${campground._id}`);
  });
  router.post('/', IsLoggedIn, async (req, res) => {
    try {
        const campground = await CampGround.findById(req.params.id);
        if (!campground) {
            req.flash('error', 'Campground not found');
            return res.redirect('/campgrounds');
        }
        const review = new Review({
            body: req.body.review.body,    // Accessing review body
            rating: req.body.review.rating // Accessing review rating
        });
        review.author = req.user._id;
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        req.flash('success', 'Review added successfully!');
        res.redirect(`/campground/${campground._id}`);
    } catch (err) {
        req.flash('error', 'There was a problem creating the review');
        res.redirect(`/campground/${req.params.id}`);
    }
});

  module.exports=router