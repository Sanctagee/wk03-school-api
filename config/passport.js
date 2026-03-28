// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email']
    },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log('✅ Existing user:', user.email);
          return cb(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          profilePhoto: profile.photos[0]?.value || '',
          role: 'viewer'
        });

        console.log('✅ New user created:', user.email);
        return cb(null, user);

      } catch (err) {
        console.error('❌ Passport error:', err.message);
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user._id.toString());
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;