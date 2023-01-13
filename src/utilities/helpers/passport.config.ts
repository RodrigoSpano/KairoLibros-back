import { Request } from 'express'
import { Types } from 'mongoose'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import userModel from '../../models/user.model'

interface IPayload {
  id: string | Types.ObjectId
  email: string
}

const cookieExtractor = function(req: Request) {
  let token = null
  if(req && req.cookies) token = req.cookies['Authorization']
  return token
}

export default new Strategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: `${process.env.JWT_SECRET}`
}, 
  async (payload: IPayload, done: any) => {
    try {
      const user = await userModel.findOne({_id: payload.id})
      if(!user) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
}
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});