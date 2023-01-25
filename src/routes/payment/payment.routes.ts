import axios from "axios";
import { Router } from "express";
import * as controller from '../../controllers/payments/mpControllers'
const router = Router()
import store from 'store2'


router.get('/mercadopago', controller.getPaymentLink)
router.post('/notification', controller.postNotifications)
router.get('/info', (req, res) => {
  axios.get('https://api.mercadopago.com/merchant_orders/7433154915',{
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${process.env.MP_PRUEBA_ACCESS_TOKEN}`
    }
  })
    .then(resp =>console.log(resp.data.payments))
  res.send(200)
})

//todo => failed with POST method, better to try do a GET with the data from MONGODB CART, asi probrablemnte me deje hacerlo

export default router