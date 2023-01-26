import axios from "axios";
import { Router } from "express";
import * as controller from '../../controllers/payments/mpControllers'
import { checkMerchantId } from "../../utilities/middlewares/orderMiddleware";
const router = Router()


router.get('/mercadopago', controller.getPaymentLink)
router.post('/notification', checkMerchantId, controller.postNotifications)


//todo => failed with POST method, better to try do a GET with the data from MONGODB CART, asi probrablemnte me deje hacerlo

export default router