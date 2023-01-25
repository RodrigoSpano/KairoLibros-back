import axios from "axios";
import { Router } from "express";
import * as controller from '../../controllers/payments/mpControllers'
const router = Router()


router.get('/mercadopago', controller.getPaymentLink)
router.post('/notification', async (req, res) => {
  const {body, query} = req
  const topic = query.topic || query.type
  console.log('NOTI => 🚀', {body, query})

})

//todo => failed with POST method, better to try do a GET with the data from MONGODB CART, asi probrablemnte me deje hacerlo

export default router