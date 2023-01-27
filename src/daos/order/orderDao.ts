import cartModel from "../../models/cart.model"
import userModel from "../../models/user.model"
import orderModel from "../../models/order.model"
import { CartBase, CartItemForArray, OrderBase, UserBase } from "../../utilities/types"
import { v4 as uuid} from 'uuid'
import { restStock } from "../../utilities/helpers/helpers"
import CartDao from "../cart/cartDao"
import { payment_method } from "../../utilities/types/types"

class OrderDao {
  private model = orderModel
  private cartDao = new CartDao()
  async generateOrder(email: string, paymentMethod: string, merchantId: string){
    try {
      const user: Partial<UserBase>|any = await userModel.findOne({email})
      const cart = await cartModel.findOne({email})
      const ord = await this.model.findOne({merchantId})
      if(!ord){

        await restStock(cart!.items)
        if(cart!.ship){
        const createOrder = await this.model.create({
          userData: {username: user.username, email: user.email, phone: user.phone ? `${user.area_code} ${user.phone}`: null},
          items: cart?.items,
          ship: cart?.ship,
          address: cart?.address,
          date: new Date(),
          totalPrice: Number(cart?.total) + Number(cart?.shipCost),
          paymentMethod: paymentMethod,
          merchantId: merchantId,
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
          paymentMethod: paymentMethod,
          merchantId: merchantId,
          orderNumber: uuid()
        })
        if(createOrder){
          await this.cartDao.clearCart(email)
          return createOrder
        }
      }
    } return Error('already exists')
    } catch (error) {
      return error
    }
  }

  async createOrderWithotMP(email: string, paymentMethod: payment_method){
    try {
      const user: Partial<UserBase>|any = await userModel.findOne({email})
      const cart = await cartModel.findOne({email})
      const order = await this.model.create({
        userData: {username: user.username, email: user.email, phone: user.phone ? `${user.area_code} ${user.phone}`: null},
        items: cart?.items,
        ship: cart?.ship,
        address: cart?.address ? cart.address : null,
        date: new Date(),
        totalPrice: cart?.ship ? Number(cart?.total) + Number(cart?.shipCost) : Number(cart?.total),
        paymentMethod: paymentMethod,
        orderNumber: uuid(),
        orderStatus: 'pending'
      })
      if(order){
        await restStock(cart!.items)
        await this.cartDao.clearCart(email)
        return order
      }
    } catch (error) {
      return error
    }
  }

  async getOrder(orderNumber: string){
    try {
      return await this.model.findOne({orderNumber})
    } catch (error) {
      return error
    }
  }
  async cancelOrder(orderNumber: string){
    try {
      const findOrder = await this.model.findOne({orderNumber})
        if(!findOrder) return Error('order not found')
          return await this.model.findOneAndUpdate({orderNumber}, {orderStatus: 'canceled'}, {new: true})
    } catch (error) {
      return error
    }
  }
  async deleteOrder(id: string){
    try {
      await this.model.deleteOne({_id:id})
      return { success: true}
    } catch (error) {
      return error
    }
  }
  async setArrived(orderNumber: string){
    try {
      const findOne = await this.model.findOne({orderNumber})
      if(!findOne) return Error('order not found')
        return await this.model.findOneAndUpdate({orderNumber}, {arrived: true }, {new: true})
    } catch (error) {
      return error
    }
  }
  async setSent(orderNumber: string){
    try {
      const findOne = await this.model.findOne({orderNumber})
      if(!findOne) return Error('order not found')
        return await this.model.findOneAndUpdate({orderNumber}, {sent: true }, {new: true})
    } catch (error) {
      return error
    }
  }
}

export default OrderDao