const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

passport.use(
   new GoogleStrategy(
      {
         clientID: '156386536274-078nmjqmacjhku72ukrigkn8rf2le50v.apps.googleusercontent.com',
         clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
         // callbackURL: 'http://localhost:5173/',
         callbackURL: 'http://localhost:8000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
         console.log('Google profile:', profile)
         console.log('Access Token:', accessToken)
         try {
            console.log('Google profile:', profile)
            console.log('Access Token:', accessToken)
            return done(null, profile)
         } catch (err) {
            return done(err, null)
         }
      }
   )
)

passport.serializeUser((user, done) => {
   done(null, user)
})

passport.deserializeUser((user, done) => {
   done(null, user)
})

passport.authenticate('google', {
   failureRedirect: '/login',
   session: false,
})
