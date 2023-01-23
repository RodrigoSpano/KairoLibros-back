import axios from "axios"
import { RootMP_Body } from "../utilities/types"

class PaymentService {
  async createPayment(data: Partial<RootMP_Body>){
    const url: string = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
      payer_email: `${data.payer_email}`,
      items: [data.items],
      backs_url: {
        success: '/success',
        failure: '/failure',
        pending: '/pending'
      },
      shipments: {cost: `${data.shipCost}`, mode: 'not_specified'} ,
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