import cartModel from "../../models/cart.model";
import productModel from "../../models/product.model";
import { CartBase, CartItemForArray } from "../../utilities/types";

class CartDao {
  private model = cartModel
  private productModel = productModel

  async createCart(email: string){
    try {
      return await this.model.create({
        email: email,
        items: [],
      })
    } catch (error) {
      return error
    }
  }

  async addProduct(itemsData: CartItemForArray, email: string){
    try {
      const findProduct = await this.productModel.findOne({_id: itemsData.productId})
      if(findProduct && findProduct.stock >= itemsData.quantity){
        const findCart = await this.model.findOne({email})
        const total:number = findCart!.items.reduce((acc, el) => (acc += el.unit_price * el.quantity), 0) + itemsData.unit_price * itemsData.quantity
        if(findCart){
          const addProd: any = await this.model.findOneAndUpdate({email}, {$push: {items: itemsData}, total}, {new: true})
          return addProd
        }
      }
    } catch (error) {
      return error
    }
  }
  
  async getOneCart(email: string){
    try {
      const cart = await this.model.findOne({email})
      return cart
    } catch (error) {
      return error
    }
  }

  async toggleShip(email:string){
    try {
      const findCart = await this.model.findOne({email})
      if(!findCart!.ship){
        const updatedCartShip = await this.model.findOneAndUpdate({email}, {$set: {shipCost: 700}, ship: true}, {new: true})
        return updatedCartShip
      } else {
        const updatedCartShip = await this.model.findOneAndUpdate({email}, {$unset: {'shipCost': ''}, ship: false}, {new: true})
        return updatedCartShip
      }
    } catch (error) {
      return error
    }
  }

  async removeItem(email: string, id: string){
    try {
      await this.model.findOneAndUpdate({email}, {$pull: {items: {productId: id}}}, {new: true})  
        .then(async(resp) => {
          const total:number = resp!.items.reduce((acc, el) => (acc += el.unit_price * el.quantity), 0)
          const cart = await this.model.findOneAndUpdate({email}, {total}, {new: true})
          return cart
        })
    } catch (error) {
      return error
    }
  }

  async clearCart(email: string){
    try {
      return await this.model.findOneAndUpdate({email}, {$set: {'items': []}, total: 0}, {new: true})
    } catch (error) {
      return error
    }
  }
}

export default CartDao