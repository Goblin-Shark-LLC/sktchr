const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '944672709421-ghs7dkefluapq2us5b5pkmh5ackjvegs.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const callbackURL = "http://localhost:8080/protected"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return (done(null, profile));
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
})