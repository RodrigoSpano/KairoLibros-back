import cartModel from "../../models/cart.model"
import { CartItemForArray } from "../types"

export const MONGO_CONFIG = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }

export const itemsControlFn = async (email:string, id: string) => {
  const findCart = await cartModel.findOne({email})
  const checkExists = findCart?.items.some((el: Partial<CartItemForArray>) => el.productId === id )
  return !!checkExists
}
