import axios from "axios"
import { RootMP_Body } from "../utilities/types"

class PaymentService {
  async createPayment(){
    const url: string = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
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
        success: 'http://localhost:8080/success',
        failure: 'http://localhost:8080/failure',
        pending: 'http://localhost:8080/pending'
      },
      // shipments: {cost: `${data.shipCost}`, mode: 'not_specified'} ,
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
}
export default PaymentService