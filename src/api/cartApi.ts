import CartDao from "../daos/cart/cartDao";
import { AddressInfo, CartItemForArray } from "../utilities/types";

class CartApi {
  private dao: CartDao = new CartDao()

  async createCart(email: string){
    return await this.dao.createCart(email)
  }
  async addProduct(itemData: CartItemForArray, email: string){
    return await this.dao.addProduct(itemData, email)
  }
  async toggleShip(email: string){
    return await this.dao.toggleShip(email)
  }
  async addAddressData(email: string, address: AddressInfo){
    return await this.dao.addAddressData(email, address)
  }
  async removeItem(email: string, id: string){
    return await this.dao.removeItem(email, id)
  }
  async getOneCart(email: string){
    return await this.dao.getOneCart(email)
  }
  async clearCart(email: string){
    return await this.dao.clearCart(email)
  }

}
export default CartApi