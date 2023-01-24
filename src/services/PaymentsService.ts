import axios from "axios"
import cartModel from "../models/cart.model"

class PaymentService {
  async createPayment(){
    const url: string = 'https://api.mercadopago.com/checkout/preferences'

    const cart = await cartModel.findOne({email: 'test_user_1293653588@testuser.com'})

    const body = {
      payer_email: 'test_user_1293653588@testuser.com',
      items: cart!.items,
      backs_url: {
        success: 'http://localhost:8080/success',
        failure: 'http://localhost:8080/failure',
        pending: 'http://localhost:8080/pending'
      },
      shipments: {cost: cart?.ship ? cart.shipCost : 0, mode: 'not_specified'} ,
      notification_url: 'http://localhost:8080/notifications' //todo => endpoint para recibir estas notificaciones
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