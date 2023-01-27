import cartModel from "../../models/cart.model"
import userModel from "../../models/user.model"
import orderModel from "../../models/order.model"
import { UserBase } from "../../utilities/types"
import { v4 as uuid} from 'uuid'
import { restStock } from "../../utilities/helpers/helpers"
import CartDao from "../cart/cartDao"
import { NodemailerConfig, payment_method, order_status } from "../../utilities/types/types"
import { transporter } from "../../services/nodemailer"

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
          await transporter.sendMail({
            from: 'kairolibros@gmail.com',
            to: `kairolibros@gmail.com, ${createOrder.userData.email}`,
            subject: 'Nueva Orden Generada!!',
            html: `<h1> Acabas de realizar una compra en Kairolibros!</h1> </br>
              <h2> tu numero de orden es: ${createOrder.orderNumber} </h2> </br>
              <p>el numero de orden te sirve en caso de que ocurra algun error con tu pedido</p>
            `
          } satisfies NodemailerConfig)
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
          await transporter.sendMail({
            from: 'kairolibros@gmail.com',
            to: `kairolibros@gmail.com, ${createOrder.userData.email}`,
            subject: 'Nueva Orden Generada!!',
            html: `<h1> Acabas de realizar una compra en Kairolibros!</h1> </br>
              <h2> tu numero de orden es: ${createOrder.orderNumber} </h2> </br>
              <p>el numero de orden te sirve en caso de que ocurra algun error con tu pedido</p>
            `
          } satisfies NodemailerConfig)
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
        await transporter.sendMail({
          from:'kairolibros@gmail.com',
          to: `${user.email}`,
          subject: 'METODO DE PAGO KAIROLIBROS!',
          html: '<h1>Acabas de realizar una compra, es probable que hayas elegido "Efectivo" o "Transferencia bancaria"! </h1> </br> <h3> Manda un WSP al siguiente numero para acordar el metodo de pago. +54 1166211051</h3> <p> Vas a necesitar tu numero de orden que se te mando al confirmar la compra! </p>',
        } satisfies NodemailerConfig)
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
  async setOrderStatus(orderNumber: string, status: order_status){
    try {
      const order = await this.model.findOne({orderNumber})
      if(!order) return Error('order not found')
      return await this.model.findOneAndUpdate({orderNumber}, {orderStatus: status}, {new: true})
    } catch (error) {
      return error
    }
  }
}

export default OrderDao