import passport from "passport";
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import userModel from "../../models/user.model";

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID!,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL:process.env.GOOGLE_REDIRECT_URI,
  scope:['email', 'profile'],
}, 
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    
    done(null, {username: profile.displayName, email: profile.emails?.values})
  }))

  passport.serializeUser((user, done) => done(null, user!))
  passport.deserializeUser((user, done) => done(null, user!))