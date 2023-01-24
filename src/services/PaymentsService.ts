import axios from "axios"
import cartModel from "../models/cart.model"
import userModel from "../models/user.model"

class PaymentService {
  async createPayment(email: string){
    const url: string = 'https://api.mercadopago.com/checkout/preferences'

    const cart = await cartModel.findOne({email})
    const user = await userModel.findOne({email})

    const body = {
      payer_email: email,
      items: cart!.items,
      backs_url: {
        success: 'www.google.com',
        failure: '/failure',
        pending: '/pending'
      },
      shipments: {cost: cart?.ship ? cart.shipCost : 0, mode: 'not_specified'} ,
      notification_url: 'http://localhost:8080/payment/notifications' //todo => endpoint para recibir estas notificaciones
    }

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    })
    return payment.data
  }
}
export default PaymentService