const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');

// Register route (GET)
router.get('/register', (req, res) => {
    res.render('./users/register');
});

// Register route (POST)
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // Pass the error to the next middleware
            }
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campground');
        });
    } catch (e) {
        req.flash('error', 'There was a problem with registration. Please try again.');
        console.log(e);
        return res.redirect('/register');  // Added return to ensure response is sent
    }
});


// Login route (GET)
router.get('/login', (req, res) => {
    returnToadd=req.session.returnTo
    res.render('./users/login');
    
});

// Login route (POST)

// Login Route
router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), async (req, res) => {
    try {
        console.log("Session at login:", req.session);
        const redirectTo = returnToadd || '/campground';
        delete req.session.returnTo; // Clear returnTo after using it
        
        req.flash('success', 'Welcome back!');
        res.redirect(redirectTo);
    } catch (error) {
        console.error('Error during login redirect:', error);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/login');
    }
});



// Logout route (GET)
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', 'There was a problem logging you out.');
            return res.redirect('/campground'); // Redirect to a default page if logout fails
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campground');
    });
});

module.exports = router;
