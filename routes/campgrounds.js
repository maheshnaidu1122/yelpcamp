const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const flash = require('connect-flash');
const campground=require('../controllers/campground')
const CatchAsync = require('../error/CatchAsync');
const { IsLoggedIn, IsAuthor } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// Route for showing all campgrounds
router.route('/')
    .get(CatchAsync(campground.index))
    // Route for handling image uploads
    .post(IsLoggedIn,upload.array('image', 10), CatchAsync(campground.createcamp));


// Route for showing the new campground form
router.route('/new')
    .get( IsLoggedIn,campground.new )

// POST route for adding a new campground

// Route for showing a specific campground
router.route('/:id')
    .get( CatchAsync(campground.show))
    .put(IsLoggedIn, IsAuthor, upload.array('image'),  CatchAsync(campground.edit))
    .delete( IsLoggedIn, IsAuthor,campground.delete );
// Route for editing a campground
router.get('/:id/edit', IsLoggedIn, CatchAsync(campground.editForm));
module.exports = router;
