import { UserBase } from '../interfaces/index.d';
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
    if(user){
      if(!user.googleId){
        await userModel.findOneAndUpdate({email: profile.emails![0].value}, {$set: {googleId: profile.id}}, {new: true})
        await user.save()
        return done(null, user)
      }
      return done(null, user)
    } else {
      const newUser: Partial<UserBase> = await userModel.create({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails![0].value,
      })
      if(newUser) done(null, newUser)
    }
  }
  )
)

passport.serializeUser((user: Partial<UserBase>, done) => done(null, user._id))
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id)
  done(null, user)
})
