const express = require('express');

const router = express.Router();

const loginController = require('../loginController/login');

// const session  = require('express-session');
const passport = require('passport');
require('../googleStrategy');

require('dotenv').config();

//gogle auth redirect
    //Client should request this when "login with google" button is clicked
    //redirects automatically to '/auth/google/check'
router.get('/google', 
    passport.authenticate('google', {scope: ['email', 'profile']})
);

//auth success check, redirects automatically to feed on succes, or error component on fail
    //Client needs React Routes to '/feed' on success, and '/auth/google/failure' on failure
router.get('/google/check',
    passport.authenticate('google', {
        successRedirect: '/feed',
        failureRedirect: '/auth/google/failure'
    })
);

//auth failure endpoint - delete once client-side react route exists
router.get('/google/failure', (req, res) => {
    return res.send('Unable to authenticate user at this time.')
});

//logout endpoint - switch to post req once connected to react button
    //Client should request this endpoint when "logout" button is clicked
router.get('/logout', loginController.logOut, loginController.isLoggedIn, function(req, res){
    return res.redirect('/');
});

module.exports = router;