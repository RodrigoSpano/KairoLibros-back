import axios from "axios";
import { Router } from "express";
import * as controller from '../../controllers/payments/mpControllers'
const router = Router()
import store from 'store2'


router.get('/mercadopago', controller.getPaymentLink)
router.post('/notification', controller.postNotifications)


//todo => failed with POST method, better to try do a GET with the data from MONGODB CART, asi probrablemnte me deje hacerlo

export default router