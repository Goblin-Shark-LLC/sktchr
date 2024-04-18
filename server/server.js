const express = require('express');
const path = require('path');
const bucket = require('./bucket.js'); 

// //auth requirements
const session  = require('express-session');
const passport = require('passport');

// //middleware requirements
const loginController = require('./loginController/login');
// const userController = require('./controllers')

// require('dotenv').config();

const app = express();
const PORT = 3000;

//router requirements
const authRouter = require('./routes/authRoutes.js');
const postsRouter = require('./routes/postsRoutes.js')

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

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.get('/getUser', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    }
});

//Client side file (feed App) needed for insertion after isLoggedIn mw
app.get('/feed', loginController.isLoggedIn, (req,res) => {
    res.send(`protected page accessed. Hello ${req.user.displayName}`);
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
    //bucket.uploadFile('goblin-shark-jaw_square_copy_720.png', path.resolve(__dirname, './goblin-shark-jaw_square_copy_720.png'));
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;