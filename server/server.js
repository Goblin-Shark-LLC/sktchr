const express = require('express');
const path = require('path');
const bucket = require('./bucket.js'); 
const { User } = require('./models.js')

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

// app.use(express.static(path.resolve(__dirname, '../build')));

//default endpoint
app.get('/', loginController.isLoggedIn, (req, res) => {
        console.log('get to /')
        res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
});

app.use('/auth', authRouter);
app.use('/posts', postsRouter);


//NEED TO FIGURE OUT METHOD TO GET USER PROFILE INFO FROM PASSPORT TO CLIENT
app.get('/getUser', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    }
});

//Client side file (feed App) needed for insertion after isLoggedIn mw
app.get('/feed', loginController.isLoggedIn, (req, res) => {
        // console.log(profile.id);
        return res.redirect('/');
});

// fetch users test
// app.get('/api/users', async (req, res) => {
//     try {
//       // Fetch users from the database
//       const users = await User.find();
//       res.json(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// post request test
// app.post('/addPost', (req, res) => {
//     console.log("we are in add post server side, req ==>", req);
//     console.log("current user ===> ", req.user);
//     res.status(200).send();
// });

//404 error handling
app.use('*', (req, res) => res.status(404).send({message:'404ed'}));

//global error handling
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { error: `An error occurred. ERROR: ${err}`} 
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