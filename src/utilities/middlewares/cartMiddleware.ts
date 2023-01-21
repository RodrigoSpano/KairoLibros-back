import { Request, Response, NextFunction} from 'express'
import CartApi from '../../api/cartApi'
import cartModel from '../../models/cart.model'
import { UserBase } from '../interfaces'

export const cartHandler = async (req: Request, res: Response, next: NextFunction) => {
  const api: CartApi = new CartApi()
  const user: Partial<UserBase> | any = req.user!
  const findCart = await cartModel.findOne({email: user.email})
    if(!findCart){
      await api.createCart(user.email)
      next()
    }
    return next()
}