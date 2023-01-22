import { Request, Response, NextFunction} from 'express'
import userModel from '../../models/user.model'
import { UserBase } from '../types'

export const registerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    if(!data.email || !data.firstName || !data.lastName || !data.phoneNumber || !data.phoneArea || !data.email || !data.password) return res.status(400).json({error: 'missing fields, complete all the fields'})
    const findUser = await userModel.findOne({email: data.email})
    if(!findUser) return next()
    return res.status(400).json({error: 'user already exists! try another email'})
}

export const userExists = async (req:Request, res: Response, next: NextFunction) => {
  const findUser = await userModel.findOne({email: req.body.email})
  if(findUser) return next()
    return res.status(404).json({error: 'user not found'})
} 

export const userIsLogged = async (req: Request, res: Response, next: NextFunction) => {
  if(req.user) return next()
  res.status(400).json('please log in')
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  if(!req.isAuthenticated()) return res.redirect('/auth/login')
  return next()
}

export const isAdmin = async (req: Request, res: Response, next:NextFunction) => {
  const reqUser: Partial<UserBase> = req.user!
  if(!req.user) return res.redirect('/auth/login')
    if(reqUser.isAdmin) return next()
    return res.status(401).redirect('/products')
}