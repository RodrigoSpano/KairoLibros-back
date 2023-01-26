import cartModel from "../../models/cart.model"
import productModel from "../../models/product.model"
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

export const restStock = async (items: CartItemForArray[]) => {
  for(let item of items){
    const find = await productModel.findOne({_id: item.productId})
    if(find?.stock! >= item.quantity){
      await productModel.findOneAndUpdate({_id: item.productId}, {$inc: {stock: -item.quantity}},{new:true})
    }
  }

}

//todo => probar si funciona