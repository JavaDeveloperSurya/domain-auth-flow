const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(
 new GoogleStrategy(
  {
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: process.env.CALLBACK_URL
  },

  (accessToken, refreshToken, profile, done) => {

   const email = profile.emails[0].value

   if (!email.endsWith(`@${process.env.ALLOWED_DOMAIN}`)) {
    return done(null, false, { message: "Invalid domain" })
   }

   const user = {
    id: profile.id,
    email: email,
    role: email.startsWith("admin") ? "admin" : "user"
   }

   return done(null, user)
  }
 )
)