import axios from "axios"
import cartModel from "../models/cart.model"

class PaymentService {
  async createPayment(email: string){
    const url: string = 'https://api.mercadopago.com/checkout/preferences'

    const cart = await cartModel.findOne({email})

    const body = {
      payer_email: email,
      items: cart!.items,
      backs_url: {
        success: '/success',
        failure: '/failure',
        pending: '/pending'
      },
      shipments: {cost: cart?.ship ? cart.shipCost : 0, mode: 'not_specified'} ,
      notification_url: 'https://11e4-190-190-127-247.sa.ngrok.io/payment/notification' //todo => endpoint para recibir estas notificaciones',
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