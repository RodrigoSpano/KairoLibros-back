import cartModel from "../../models/cart.model"
import userModel from "../../models/user.model"
import orderModel from "../../models/order.model"
import { CartBase, OrderBase, UserBase } from "../../utilities/types"
import { v4 as uuid} from 'uuid'
import CartDao from "../cart/cartDao"

class OrderDao {
  private model = orderModel
  private cartDao = new CartDao()
  async generateOrder(email: string, paymentMehtod: string){
    try {
      const user: Partial<UserBase>|any = await userModel.findOne({email})
      const cart = await cartModel.findOne({email})
      if(cart!.ship){
        const createOrder = await this.model.create({
          userData: {username: user.username, email: user.email, phone: user.phone ? `${user.area_code} ${user.phone}`: null},
          items: cart?.items,
          ship: cart?.ship,
          address: cart?.address,
          date: new Date(),
          totalPrice: Number(cart?.total) + Number(cart?.shipCost),
          paymentMehtod,
          orderNumber: uuid()
        })
        if(createOrder){
          await this.cartDao.clearCart(email)
          return createOrder
        }
      } else {
        const createOrder = await this.model.create({
          userData: {username: user.username, email: user.email, phone: user.phone ? `${user.area_code} ${user.phone}`: null},
          items: cart?.items,
          ship: cart?.ship,
          date: new Date(),
          totalPrice: Number(cart?.total),
          paymentMehtod,
          orderNumber: uuid()
        })
        if(createOrder){
          await this.cartDao.clearCart(email)
          return createOrder
        }
      }
    } catch (error) {
      return error
    }
  }
  getOrder(){}
  cancelOrder(){}
}

export default OrderDao