import cartModel from "../../models/cart.model";
import productModel from "../../models/product.model";
import { CartItemForArray } from "../../utilities/interfaces";

class CartDao {
  private model = cartModel
  private productModel = productModel

  async createCart(email: string){
    try {
      return await this.model.create({
        email: email,
        items: []
      })
    } catch (error) {
      return error
    }
  }

  async addProduct(itemsData: CartItemForArray, email: string){ //todo on controller verify cart
    try {
      const findProduct = await this.productModel.findOne({_id: itemsData.productId})
      if(findProduct && findProduct.stock >= itemsData.quantity){
        const findCart = await this.model.findOne({email})
        if(findCart){
          const total: number = findCart.items.reduce((acc, el) => (acc += el.price * el.quantity), 0) 
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
      const oneCart = await this.model.findOne({email})
      return oneCart
    } catch (error) {
      return error
    }
  }

  async removeItem(email: string, id: string){
    try {
      const newCartUpdated = await this.model.findOneAndUpdate({email}, {$pull: {items: {productId: id}}}, {new: true})  
      return {cart: newCartUpdated}
    } catch (error) {
      return error
    }
  }

  async clearCart(email: string){
    try {
      return await this.model.findOneAndUpdate({email}, {$set: {'items': []}}, {new: true})
    } catch (error) {
      return error
    }
  }
}

export default CartDao