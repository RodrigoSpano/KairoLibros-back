import passport from "passport";
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import userModel from "../../models/user.model";

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACKURI,
  },
  async function(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback){
    const user = await userModel.findOne({ email: profile.emails![0].value})
    console.log(user)
    return done(null, user!)
  }
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user!))