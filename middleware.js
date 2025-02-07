const CampGround = require('./models/campground');  // Ensure the model is required properly
const Review=require('./models/reviews');

// IsLoggedIn Middleware
module.exports.IsLoggedIn = (req, res, next) => {
    console.log("Before redirect:", req.session);
    if (!req.isAuthenticated()) {
        console.log("nudedebdedbued")
        req.session.returnTo = req.originalUrl;  // Save the attempted URL
        req.flash('error', 'You must be signed in.');
        return res.redirect('/login');
    }
    next();  // Continue to the requested route
};

module.exports.IsAuthor = async (req, res, next) => {
    

    // Find the campground to check ownership
    const campground = await CampGround.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect('/campgrounds');  // Redirect to list of campgrounds if not found
    }

    // Check if the current user is the author of the campground
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campground/${campground._id}`);  // Redirect to the campground page
    }

    // If the user is the author, proceed to the next middleware or controller
    next();
}


module.exports.IsReviewAuthor=async(req,res,next)=>{
    const { id,reviewid } = req.params;
    const review = await Review.findById(reviewid);
    // Check if the logged-in user is the author of the campground
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that.');
        return res.redirect(`/campground/${campground._id}`);
    }

    // If the user is the author, proceed to the next middleware/route handler
    next();
};


