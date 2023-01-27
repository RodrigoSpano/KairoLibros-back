import { Router } from "express";
import * as controller from '../../controllers/payments/mpControllers'
import { isAdmin, isAuth } from "../../utilities/middlewares/authMiddlewares";
import { checkMerchantId } from "../../utilities/middlewares/orderMiddleware";
const router = Router()


router.get('/mercadopago', controller.getPaymentLink)
router.post('/notification', checkMerchantId, controller.postNotifications)
router.get('/merchant_order/:id', isAdmin, controller.getMerchants)

export default router