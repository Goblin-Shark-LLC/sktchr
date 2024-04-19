const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const models = require('./models.js');

require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/check",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
      const user = await models.User.findOne({email: profile.email});
      if(user === null){
        models.User.create({
            email: profile.email,
            posts: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            }, function (err, user) {
              console.log(`error: ${err}`);
        });
      }
      return done(null, profile);
      }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
})