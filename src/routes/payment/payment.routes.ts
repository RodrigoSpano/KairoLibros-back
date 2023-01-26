import axios from "axios";
import { Router } from "express";
import * as controller from '../../controllers/payments/mpControllers'
import { checkMerchantId } from "../../utilities/middlewares/orderMiddleware";
const router = Router()


router.get('/mercadopago', controller.getPaymentLink)
router.post('/notification', checkMerchantId, controller.postNotifications)

export default router