import axios from "axios"
import { RootMP_Body, RootSub } from "../utilities/types"

class PaymentService {
  async createPayment(){
    const url: string = 'https://api.mercadopago.com/checkout/preferences'

    const body: RootMP_Body = {
      payer_email: 'test_user_1293653588@testuser.com',
      items: [
        {
          title: 'dummy title',
          description: 'dummy description',
          picture_url: 'https://www.myapp.com/myimage.jpg',
          category_id: 'cat123',
          quantity: 1,
          unit_price: 10
        }
      ],
      backs_url: {
        success: '/success',
        failure: '/failure',
        pending: '/pending'
      },
      notification_url: 'https://www.your.site.com/ipn' //todo => endpoint para recibir estas notificaciones
    }

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    })
    return payment.data
  }
  async createSubscription(){
    const url: string = 'https://api.mercadopago.com/preapproval' 

    const body: RootSub = {
      reason: 'subscription de ejemplo',
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: 10,
        currency_id: 'ARS'
      },
      back_url: '/',
      payer_email: 'test_user_1293653588@testuser.com'
    }
    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    })
    return subscription.data
  }
}
export default PaymentService