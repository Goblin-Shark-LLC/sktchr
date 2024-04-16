const express = require('express');
const path = require('path');

// //auth requirements
const session  = require('express-session');
const passport = require('passport');
require('./googleStrategy');

//middleware requirements
const loginController = require('./loginController/login');
const userController = require('./controllers')

require('dotenv').config();

const app = express();
const PORT = 3000;

//router requirements
const authRouter = require('./routes/authRoutes.js');

app.use(session({ secret: process.env.G_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

//default endpoint
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
});

// handle user signup
// app.post('/signup', userController.createUser, (req, res) => {
//     res.status(200).redirect('/');
// });

// app.use('/login', authRouter);
// app.use('/auth/google', authRouter);
// app.use('auth/google/check', authRouter);
// app.use('auth/google/failure', authRouter);
// app.use('/feed', authRouter);
// app.use('/logout', authRouter);

//login endpoint - client should request this url when login button is clicked. Update to just send status 200.
    //Client should wait for reply of 200 and serve login component with "login with google button" which requests '/auth/google'
app.get('/login', (req, res) => {
    res.status(200).send('<a href="/auth/google">Authenticate with Google</a>');
});

//gogle auth redirect
    //Client should request this when "login with google" button is clicked
    //redirects automatically to '/auth/google/check'
app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile']})
);

//auth success check, redirects automatically to feed on succes, or error component on fail
    //Client needs React Routes to '/feed' on success, and '/auth/google/failure' on failure
app.get('/auth/google/check',
    passport.authenticate('google', {
        successRedirect: '/feed',
        failureRedirect: '/auth/google/failure'
    })
);

//auth failure endpoint - delete once client-side react route exists
app.get('/auth/google/failure', (req, res) => {
    res.send('Unable to authenticate user at this time.')
});

//update to "/feed" once done testing auth
    //Client side file (feed App) needed for insertion after isLoggedIn mw
app.get('/feed', loginController.isLoggedIn, (req,res) => {
    res.send(`protected page accessed. Hello ${req.user.displayName}`);
});

//logout endpoint - switch to post req once connected to react button
    //Client should request this endpoint when "logout" button is clicked
app.get('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) { return next({
            message: 'An error occurred during logout process.',
            error: err
            });
        }
      res.redirect('/');
    });
});

app.get('/getUser', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    }
});

//404 error handling
app.use('*', (req, res) => res.status(404).send({message:'404ed'}));

//global error handling
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' } 
      };
      const errorObj = Object.assign(defaultErr, err);
      console.log('here\'s the error:', errorObj.log);
      return res.status(errorObj.status).send(errorObj.message);
  });

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;